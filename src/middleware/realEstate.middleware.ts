import { Request, Response, NextFunction } from 'express';

/**
 * Logs each request to the real estate endpoints.
 */
export function realEstateLogger(req: Request, res: Response, next: NextFunction): void {
    console.log(`[RealEstate] ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
    next();
}

/**
 * Validates that the required fields are present for creating escrow signatures.
 */
export function validateCreateSignatures(req: Request, res: Response, next: NextFunction): void {
    const { buyer, seller, nftId, purchasePrice } = req.body;

    if (!buyer || !seller || nftId === undefined || !purchasePrice) {
        res.status(400).json({ message: 'Missing required fields: buyer, seller, nftId, purchasePrice are required.' });
        return;
    }
    next();
}

/**
 * Validates that escrowAddress is provided when completing an escrow.
 */
export function validateCompleteEscrow(req: Request, res: Response, next: NextFunction): void {
    const { escrowAddress } = req.body;
    if (!escrowAddress) {
        res.status(400).json({ message: 'Missing escrowAddress in request body.' });
        return;
    }
    next();
}
