import { Router } from 'express';
import { getAllSupplyChainDocs } from '../controllers/supplyChain.controller';

const router = Router();

// GET /api/supplychain
router.get('/', getAllSupplyChainDocs);

export default router;
