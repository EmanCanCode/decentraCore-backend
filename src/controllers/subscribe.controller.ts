import { Request, Response } from 'express';
import mongo from '../config/mongo';

export async function subscribeController(req: Request, res: Response) {
    try {
        const { email } = req.body;
        await mongo.addEmailSubscribe(email as string);
        res.status(200).json({ message: 'Email subscribed successfully' });
    } catch (err) {
        console.error('Error in subscribeController:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}