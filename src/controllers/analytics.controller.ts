import { Request, Response } from 'express';
import mongo from '../config/mongo';

export async function getAllDocumentsController(req: Request, res: Response) {
    try {
        const allDocs = await mongo.getAllDocuments();
        res.status(200).json(allDocs);
    } catch (error) {
        console.error('Error in getAllDocumentsController:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}