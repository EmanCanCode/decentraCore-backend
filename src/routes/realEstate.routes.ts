import { Router } from 'express';
import { 
  getEscrowIdController, 
  deleteRealEstateDocController, 
  createEscrowSignaturesController, 
  completeEscrowController 
} from '../controllers/realEstate.controller';
import { 
  realEstateLogger, 
  validateCreateSignatures, 
  validateCompleteEscrow 
} from '../middleware/realEstate.middleware';

const router = Router();

// Apply the logger middleware for all real estate endpoints.
router.use(realEstateLogger);

// GET /api/realEstate/:buyer -> returns escrowId
router.get('/:buyer', getEscrowIdController);

// DELETE /api/realEstate/:buyer -> deletes document with that buyer
router.delete('/:buyer', deleteRealEstateDocController);

// POST /api/realEstate/create-signatures -> create escrow signatures
router.post('/create-signatures', validateCreateSignatures, createEscrowSignaturesController);

// POST /api/realEstate/complete-escrow -> complete the escrow
router.post('/complete-escrow', validateCompleteEscrow, completeEscrowController);

export default router;
