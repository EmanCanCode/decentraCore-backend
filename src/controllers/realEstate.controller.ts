import { Request, Response } from 'express';
import mongo from '../config/mongo';
import blockchain from '../services/blockchain.service';
import { BigNumber } from 'ethers';

// GET /api/realestate/:buyer -> returns escrowId or null
export async function getEscrowIdController(req: Request, res: Response) {
  try {
    console.log('Attempting to get escrowId for buyer');
    const { buyer } = req.params;
    const escrowId = await mongo.getEscrowId(buyer);
    // If not found, escrowId will be null
    if (!escrowId) {
      console.log('EscrowId not found for buyer', buyer ?? buyer);
      res.status(404).json({ message: 'EscrowId not found' });
      return;
    }
    console.log('EscrowId found:', escrowId);
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


// POST /api/realestate/create-signatures
export async function createEscrowSignaturesController(req: Request, res: Response) {
  try {
    // Expect buyer, seller, nftId, purchasePrice in request body
    const { buyer, seller, nftId, purchasePrice } = req.body;
    // purchasePrice is presumably a string in JSON, so parse it into BigNumber
    const purchasePriceBN = BigNumber.from(purchasePrice);

    // call service
    const { sellerSignature, lenderSignature } = await blockchain.createEscrowFactorySignatures(
      buyer,
      seller,
      nftId,
      purchasePriceBN
    );

    res.status(200).json({ sellerSignature, lenderSignature });
  } catch (error) {
    console.error('Error creating escrow signatures:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// POST /api/realestate/complete-escrow
export async function completeEscrowController(req: Request, res: Response) {
  try {
    const { escrowAddress } = req.body;
    if (!escrowAddress) {
      res.status(400).json({ message: 'Missing escrowAddress' });
    }

    const success = await blockchain.completeEscrow(escrowAddress);
    if (success) {
      res.status(200).json({ message: 'Escrow completed successfully' });
    } else {
      res.status(500).json({ message: 'Failed to complete escrow' });
    }
  } catch (error) {
    console.error('Error completing escrow:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}