import { Request, Response } from 'express';
import blockchain from '../services/blockchain.service'; // if you exported a singleton

// Simple "GET /api/blockchain/faucet?address=0x..." endpoint
export async function requestFaucetController(req: Request, res: Response) {
  try {
    const { address } = req.query;  
    if (!address || typeof address !== 'string') {
      res.status(400).json({ message: 'Missing or invalid address param' });
    }

    const success = await blockchain.requestFaucet(address as string);
    if (!success) {
      res.status(500).json({ message: 'Faucet request failed' });
    }

    res.status(200).json({ message: 'Faucet request succeeded' });
  } catch (error) {
    console.error('Error in requestFaucetController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
