import { Request, Response } from 'express';
import mongo from '../config/mongo';

export async function getAllSupplyChainDocs(req: Request, res: Response) {
  try {
    const docs = await mongo.getSupplyChainDocs();
    res.status(200).json(docs);
  } catch (error) {
    console.error('Error fetching supply chain documents:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
