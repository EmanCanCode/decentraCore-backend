import { Router } from 'express';
import { getEscrowIdController, deleteRealEstateDocController } from '../controllers/realEstate.controller';

const router = Router();

// GET /api/realestate/:buyer -> returns escrowId
router.get('/:buyer', getEscrowIdController);

// DELETE /api/realestate/:buyer -> deletes doc
router.delete('/:buyer', deleteRealEstateDocController);

export default router;
