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

dotenv.config();

const app = express();

// only allow these origins
const allowedOrigins = [
  'https://emancancode.io',
  'http://localhost:4200',
  'http://127.0.0.1:4200'
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
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
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
