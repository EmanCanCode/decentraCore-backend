import { Request, Response } from 'express';
import mongo from '../config/mongo';

// GET /api/realestate/:buyer -> returns escrowId or null
export async function getEscrowIdController(req: Request, res: Response) {
  try {
    const { buyer } = req.params;
    const escrowId = await mongo.getEscrowId(buyer);
    // If not found, escrowId will be null
    if (!escrowId) {
        res.status(404).json({ message: 'EscrowId not found' });
        return;
    } 

    res.status(200).json({ escrowId });
  } catch (error) {
    console.error('Error fetching escrowId:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// DELETE /api/realestate/:buyer -> deletes the doc with that buyer
export async function deleteRealEstateDocController(req: Request, res: Response) {
  try {
    const { buyer } = req.params;
    await mongo.deleteRealEstateDoc(buyer);
    res.status(200).json({ message: 'RealEstate document deleted successfully' });
  } catch (error) {
    console.error('Error deleting RealEstate document:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
