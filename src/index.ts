// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongo from './config/mongo';  // Import the single instance
import financeRoutes from './routes/finance.routes'; 
import supplyChainRoutes from './routes/supplyChain.routes';
import realEstateRoutes from './routes/realEstate.routes';
import blockchainRoutes from './routes/blockchain.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
  try {
    // Connect once on startup
    await mongo.connect();
    console.log('MongoDB connected');

    // Basic route
    app.get('/', (req, res) => {
      res.send('API is up and running!');
    });

    // Register routes
    app.use('/api/finance', financeRoutes);

    // Supply Chain endpoints -> GET /api/supplychain
    app.use('/api/supplychain', supplyChainRoutes);

    // Real Estate endpoints -> GET /api/realestate/:address, DELETE ...
    app.use('/api/realestate', realEstateRoutes);

    // Blockchain endpoints -> GET or POST /api/blockchain/faucet
    app.use('/api/blockchain', blockchainRoutes);

    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
})();
