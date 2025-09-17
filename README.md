# DecentraCore — API Module (Express + TypeScript)

The DecentraCore **API** bridges on-chain events and off-chain data for the frontend.  
It exposes REST endpoints for **Finance**, **Supply Chain**, **Real Estate**, **Blockchain Utilities (faucet)**, **Subscriptions**, **Contact Email**, and **Analytics**.

- Runtime: **Node 22.x**, **Express 4**, **TypeScript**
- Data store: **MongoDB** (collections aggregated by blockchain listeners)
- Web3: **ethers v5**
- Deploy: **Docker / Docker Compose**
- Security: API key middleware, strict CORS allow‑list

---

## 📁 Project Layout

```
__api/
  Dockerfile
  docker-compose.yml
  package.json
  nodemon.json
  tsconfig.json
  src/
    index.ts
    services/
      blockchain.service.ts
      config.json            # on-chain addresses/ABIs used by API
      email.service.ts
    config/
      mongo.ts               # Mongo connection + helpers
    middleware/
      auth.middleware.ts
      blockchain.middleware.ts
      email.middleware.ts
      finance.middleware.ts
      logger.middleware.ts
      realEstate.middleware.ts
      subscribe.middleware.ts
    routes/
      analytics.routes.ts
      blockchain.routes.ts
      email.routes.ts
      finance.routes.ts
      realEstate.routes.ts
      subscribe.routes.ts
      supplyChain.routes.ts
    controllers/
      analytics.controller.ts
      blockchain.controller.ts
      email.controller.ts
      finance.controller.ts
      realEstate.controller.ts
      subscribe.controller.ts
      supplyChain.controller.ts
    interfaces/
      interfaces.d.ts        # Mongo document types
      blockchain.interfaces.d.ts
    ...
```

---

## ⚙️ What This API Does

- **Finance endpoints** read Mongo aggregates from on‑chain AMM events (CPAMM/CSAMM/OBMM).
- **Supply Chain endpoints** expose provenance & inventory metrics built from chain events.
- **Real Estate endpoints** facilitate escrow lifecycle (fetch escrowId, build signatures, finalize sale) while reflecting DB state.
- **Blockchain utilities** include a **/faucet** route wired to a funded wallet for local/testing.
- **Email & Subscribe** endpoints support the public site (contact form + mailing list).
- **Analytics** helper dumps all collections for admin/debug.

---

## 🔌 Endpoints

> Base path is the API root (e.g., `https://api.example.com`). The app mounts routes under `/api/*` in `src/index.ts`.

### Health
- `GET /` → `"API is up and running!"`

### Finance (`/api/finance`)
- `GET /api/finance`  
  Returns all finance documents (CPAMM, CSAMM, OBMM) from Mongo.  
  Controller: `getAllFinanceDocs`

### Supply Chain (`/api/supplyChain`)
- `GET /api/supplyChain`  
  Returns both Provenance and InventoryManagement aggregates.  
  Controller: `getAllSupplyChainDocs`

### Real Estate (`/api/realEstate`)
- `GET /api/realEstate/:buyer`  
  Returns the `escrowId` for a buyer (if exists).  
  Controller: `getEscrowIdController`

- `DELETE /api/realEstate/:buyer`  
  Deletes the buyer’s escrow doc (used after completion).  
  Controller: `deleteRealEstateDocController`

- `POST /api/realEstate/create-signatures`  
  Validates request and returns **signatures** for the EscrowFactory two‑step flow (verify → create).  
  Middleware: `validateCreateSignatures`  
  Controller: `createEscrowSignaturesController`

- `POST /api/realEstate/complete-escrow`  
  Validates request and drives the **finalization** sequence on the Escrow (deposits, approvals, lender path).  
  Middleware: `validateCompleteEscrow`  
  Controller: `completeEscrowController`

### Blockchain (`/api/blockchain`)
- `GET /api/blockchain/faucet?address=0x...`  
  Validates the EVM address and sends test funds on the local chain.  
  Middleware: `blockchainFaucetLogger`, `validateFaucetAddress`  
  Controller: `requestFaucetController`  
  Service: `blockchain.requestFaucet(address)`

### Subscribe (`/api/subscribe`)
- `POST /api/subscribe` `{ email }`  
  Adds an email to the `Subscribe` document (hash‑keyed for O(1) lookup).  
  Middleware: `subscribeMiddleware`  
  Controller: `subscribeController`

### Contact (`/api/contact`)
- `POST /api/contact` `{ name, email, phone, subject, message }`  
  Sends a contact email via Nodemailer.  
  Middleware: `validateContactForm`  
  Controller: `emailController`  
  Service: `EmailService.sendContactEmail(...)`

### Analytics (`/api/analytics`)
- `GET /api/analytics/documents`  
  Returns all documents from every collection (admin/debug).  
  Controller: `getAllDocumentsController`

---

## 🧩 Services & Data Model

### Mongo (`src/config/mongo.ts`)
- Connects to `process.env.MONGO_URI`, DB: `DecentraCore`.
- Collections and document types defined in `src/interfaces/interfaces.d.ts`:
  - **FinanceDocument** (`type: 'CPAMM' | 'CSAMM' | 'OBMM'`, `totalSwaps`, `totalVolume`, `totalFees`, `totalCancelled?`)
  - **SupplyChain**: two docs
    - `type: 'Provenance'` with `totalRecords`, `completedRecords`, `totalValueProcessed`
    - `type: 'InventoryManagement'` with `totalMovements`, `totalOutbound`, `totalReorders`
  - **RealEstateDocument**: `{ buyer: string, escrowId: string }`
  - **SubscribeDocument**: single row: `{ emanCanCode: true, [encodedEmail]: true }`
- Helpers:
  - `getFinanceDocs()`, `getSupplyChainDocs()`, `getRealEstateDoc(buyer)`, `deleteRealEstateDoc(buyer)`
  - `addEmailSubscribe(email)`
  - `getAllDocuments()`

### Blockchain Service (`src/services/blockchain.service.ts`)
- Wraps a **JsonRpcProvider** and funded wallets (faucet, deployer, escrowManager, seeders).  
- Loads **chain addresses/ABIs** from `src/services/config.json`.
- Key methods (abridged):
  - `requestFaucet(address)` → sends ETH from faucet wallet.
  - `createEscrowSignatures(...)` → computes digests & returns signatures for the EscrowFactory verify step.
  - `setFinanceOnEscrow(buyer, id)` → writes `id` into `Finance` (collateral target) for the escrow.
  - `completeEscrow(...)` → performs deposits/approvals and `finalizeSale()` based on lender/cash path.

> **Note:** This mirrors your on‑chain **two‑phase verify→create** flow. The API centralizes signature generation and operational coordination for the demo.

### Email Service (`src/services/email.service.ts`)
- Nodemailer transport (SMTP creds from env).
- Sends contact form submissions to a target inbox.  

---

## 🛡️ Middleware & Security

- **`auth.middleware.ts`** — checks `x-api-key` header against `process.env.BACKEND_API_KEY`.  
  You can mount this selectively if some routes need authentication.
- **Validation middleware** per route group:
  - `blockchain.middleware.ts` → validate faucet address, log faucet calls.
  - `email.middleware.ts` → sanitize & validate contact form.
  - `finance.middleware.ts` / `realEstate.middleware.ts` / `subscribe.middleware.ts` → request‑shape checks and logging.
- **CORS**:
  - Allow‑list based on `process.env.ALLOWED_ORIGINS` (comma‑separated).  
  - Preflight handled globally, credentials enabled when origin is allowed.

---

## 🔧 Configuration

Environment variables (example):
```
PORT=3000
MONGO_URI=mongodb://mongo:27017
BACKEND_API_KEY=supersecret
ALLOWED_ORIGINS=https://emancancode.online,http://localhost:4200

# Chain access
PROVIDER_URL=http://hardhat:8545
FAUCET_PRIVATE_KEY=0x...
ESCROW_MANAGER_PRIVATE_KEY=0x...
DEPLOYER_PRIVATE_KEY=0x...
SEEDER1_PRIVATE_KEY=0x...
SEEDER2_PRIVATE_KEY=0x...
SEEDER3_PRIVATE_KEY=0x...

# Email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM="DecentraCore <noreply@emancancode.online>"
```

`src/services/config.json` holds deployed addresses & minimal ABIs for `EscrowFactory`, `Escrow`, `Finance`, `FungibleToken`, etc.  
This file is updated by your blockchain tasks after (re)deploys.

---

## 🐳 Docker

With Compose (API + Mongo + Hardhat in the same network, AFTER chain tasks have run):
```bash
docker compose up --build
```

Typical services:
- `api` → builds this project, runs `node dist/index.js`
- `mongo` → local MongoDB (port internal to the network)
- `hardhat` → JSON-RPC dev chain used by the API + listeners

---

## ▶️ Local Development

```bash
# install
npm install

# run with auto-reload
npm run dev  # nodemon

# build JS
npm run build

# start compiled server
npm start
```

The server mounts routes in `src/index.ts` and connects to Mongo **before** listening.  
If `MONGO_URI` is not set or cannot connect, the process exits.

---

## ✅ Testing Ideas (not yet included)

- Unit test controllers (mock Mongo layer).  
- Integration test `blockchain.service` against a Hardhat node.  
- CORS tests ensuring only expected origins are permitted.  
- Middleware tests for validation/error paths.

---

## 🔭 Observability

- Basic request logging via `logger.middleware.ts`.  
- Add `/health` if deploying behind a reverse proxy (Cloudflare tunnel can check it).  
- Consider `pino` for structured logs in production.

---

## 🧭 Versioning & Compatibility

- Built and tested with Node 22.x (Docker image pins this).  
- Uses ethers v5 to match your listeners codebase.  
- Typescript config targets NodeNext module resolution.

---

## 📎 Notes

- This API is intentionally **stateless**: all persistent state is in MongoDB, fed by your on‑chain listeners.  
- Frontend can read it directly or via the same origin if Nginx proxies `/api/*` to this server.

---

**Author:** [EmanCanCode](https://github.com/EmanCanCode) • **Project:** DecentraCore
