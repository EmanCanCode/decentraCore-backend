import { Router } from 'express';
import { getAllFinanceDocs } from '../controllers/finance.controller';
import { financeLogger } from '../middleware/finance.middleware';


const router = Router();

// GET /api/finance
router.get('/', financeLogger, getAllFinanceDocs);

export default router;
