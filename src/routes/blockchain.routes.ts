import { Router } from 'express';
import { requestFaucetController } from '../controllers/blockchain.controller';

const router = Router();

// GET or POST /api/blockchain/faucet
router.get('/faucet', requestFaucetController);

export default router;
