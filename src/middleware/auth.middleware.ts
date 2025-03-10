import { Request, Response, NextFunction } from 'express';


export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.BACKEND_API_KEY) {
        res.status(401).json({ message: 'Unauthorized: Invalid API Key' });
        return;
    }
    next();
}
