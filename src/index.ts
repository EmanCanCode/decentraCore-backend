import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongo from './config/mongo';
import financeRoutes from './routes/finance.routes';
import supplyChainRoutes from './routes/supplyChain.routes';
import realEstateRoutes from './routes/realEstate.routes';
import blockchainRoutes from './routes/blockchain.routes';
import subscribeRoutes from './routes/subscribe.routes';
import emailRoutes from './routes/email.routes';
import analyticsRoutes from './routes/analytics.routes'; // import analytics routes
import { logger } from './middleware/logger.middleware'; // import named logger function
import { authMiddleware } from './middleware/auth.middleware';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import type { RequestHandler } from 'express';

dotenv.config();

const app = express();

// only allow these origins
const allowedOrigins = [
  'https://emancancode.io',
  'http://localhost:4200',
  'http://127.0.0.1:4200',
  'http://localhost:8080',
  // add whatever port the api is running on so it can call itself
  'http://localhost:3000',
  'https://emancancode.online',
  'https://api.emancancode.online',
  'https://app.emancancode.online',
  'https://chain.emancancode.online',
  'https://meta.emancancode.online',
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // if no origin (e.g. curl, Postman) allow it as well
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  // allowedHeaders: ['Content-Type','Authorization'],
  credentials: true,
};

// preflight for all routes
app.options('*', cors(corsOptions));
// actual CORS middleware
app.use(cors(corsOptions));
app.use(express.json());

// custom middlewares
// app.use(authMiddleware);
app.use(logger);

/* ------------------------ Swagger docs (GET-only) ------------------------ */

// load the OpenAPI spec from the same directory as this file
const swaggerSpec = YAML.load(path.join(__dirname, 'openapi.yaml'));

// only allow GETs to docs (UI + raw spec). others -> 405
const docsGetOnly: RequestHandler = (req, res, next) => {
  if (req.method === 'GET') {
    next();
    return;
  }

  res.status(405).send('Method Not Allowed');
};

// optional lightweight auth for docs (enable by setting DOCS_KEY and uncommenting below)
// requires header: x-docs-key: <your-secret>
// const docsAuth: RequestHandler = (req, res, next) => {
//   const key = req.header('x-docs-key');
//   if (!key || key !== process.env.DOCS_KEY) {
//     return res.status(401).send('Unauthorized');
//   }
//   next();
// };

// serve the raw spec (GET only)
app.get('/openapi.yaml', docsGetOnly, (req, res) => {
  res.type('text/yaml').sendFile(path.join(__dirname, 'openapi.yaml'));
});

// serve the swagger UI (GET only; add docsAuth if you want header auth)
app.use(
  '/docs',
  docsGetOnly,
  // docsAuth,
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: false,
    customSiteTitle: 'DecentraCore API Docs',
  })
);
/* ------------------------------------------------------------------------ */

(async () => {
  try {
    await mongo.connect();
    console.log('MongoDB connected');

    app.get('/', (req, res) => {
      res.send('API is up and running!');
    });

    app.use('/api/finance', financeRoutes);
    app.use('/api/supplyChain', supplyChainRoutes);
    app.use('/api/realEstate', realEstateRoutes);
    app.use('/api/blockchain', blockchainRoutes);
    app.use('/api/subscribe', subscribeRoutes);
    app.use('/api/contact', emailRoutes);
    app.use('/api/analytics', analyticsRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
})();
