import { Router } from 'express';
import { getAllDocumentsController } from '../controllers/analytics.controller';

const router = Router();

// Route to get all documents from the database
router.get('/documents', getAllDocumentsController);

export default router;
