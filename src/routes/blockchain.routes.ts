import { Router } from 'express';
import { requestFaucetController } from '../controllers/blockchain.controller';
import { validateFaucetAddress, blockchainFaucetLogger } from '../middleware/blockchain.middleware';

const router = Router();

// Apply the faucet-specific middleware:
// 1. Log each request
// 2. Validate that the query contains a valid "address"
router.get('/faucet', blockchainFaucetLogger, validateFaucetAddress, requestFaucetController);

export default router;
