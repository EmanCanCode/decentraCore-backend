import { Request, Response } from 'express';
import mongo from '../config/mongo';

export const getAllFinanceDocs = async (req: Request, res: Response) => {
  try {
    // Use the existing mongo singleton to get data
    const financeDocs = await mongo.getFinanceDocs();
    res.status(200).json(financeDocs);
  } catch (error) {
    console.error('Error fetching finance documents:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
