import { Router } from 'express';
import { getAllFinanceDocs } from '../controllers/finance.controller';

const router = Router();

// GET /api/finance
router.get('/', getAllFinanceDocs);

export default router;
