# ┌───────────────────────────────────────────────────────────────────────────┐

# │ Dockerfile for your "backend" module                                     │

# │  - Builds a production-ready image for your Node.js API server            │

# │  - Installs only production dependencies (leaner image)                   │

# │  - Exposes port 3000 and starts the server with your existing npm script  │

# └───────────────────────────────────────────────────────────────────────────┘

# 1) Base image: Node.js 22 LTS on Alpine (lightweight, secure)

FROM node:22.14.0-alpine

# 2) Set production environment variable (enables prod optimizations)

ENV NODE\_ENV=production

# 3) Create and set working directory

WORKDIR /app

# 4) Copy package manifests and install production dependencies

# Caches layer to avoid reinstalling on unrelated code changes

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# 5) Copy application source code into container

# Now all files (including src/, listeners/, etc.) are available under /app

COPY . .

# 6) Expose API port to host machine

# Your server listens on 3000

EXPOSE 3000

# 7) Default command: start the server

# Uses your existing npm start (no changes required to package.json)

CMD ["npm", "run", "dev"]
