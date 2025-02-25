import { Router } from 'express';
import { getEscrowIdController, deleteRealEstateDocController, createEscrowSignaturesController, completeEscrowController } from '../controllers/realEstate.controller';

const router = Router();

// GET /api/realestate/:buyer -> returns escrowId
router.get('/:buyer', getEscrowIdController);

// DELETE /api/realestate/:buyer -> deletes doc
router.delete('/:buyer', deleteRealEstateDocController);

// POST /api/realestate/create-signatures
router.post('/create-signatures', createEscrowSignaturesController);

// POST /api/realestate/complete-escrow
router.post('/complete-escrow', completeEscrowController);

export default router;
