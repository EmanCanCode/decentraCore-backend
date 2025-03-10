import { Request, Response, NextFunction } from 'express';
import { ethers } from 'ethers';

/**
 * Validates that a valid Ethereum address is provided in the "address" query parameter.
 */
export function validateFaucetAddress(req: Request, res: Response, next: NextFunction): void {
  const { address } = req.query;
  if (!address || typeof address !== 'string' || !ethers.utils.isAddress(address)) {
    res.status(400).json({ message: 'Missing or invalid address parameter' });
    return;
  }
  next();
}

/**
 * Logs each request to the blockchain faucet endpoint.
 */
export function blockchainFaucetLogger(req: Request, res: Response, next: NextFunction): void {
  console.log(`[Faucet] ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  next();
}
