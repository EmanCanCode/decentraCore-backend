import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongo from './config/mongo';  
import financeRoutes from './routes/finance.routes'; 
import supplyChainRoutes from './routes/supplyChain.routes';
import realEstateRoutes from './routes/realEstate.routes';
import blockchainRoutes from './routes/blockchain.routes';
import { logger } from './middleware/logger.middleware'; // import named logger function
import { authMiddleware } from './middleware/auth.middleware';

dotenv.config();

const app = express();

// built-in & 3rd-party middleware
app.use(cors());
app.use(express.json());

// custom middlewares
// app.use(authMiddleware);
app.use(logger);

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

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
})();
