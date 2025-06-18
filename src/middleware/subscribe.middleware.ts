import { Request, Response, NextFunction } from 'express';


export function subscribeMiddleware(req: Request, res: Response, next: NextFunction): void {
    const { email } = req.body;
    if (!email || typeof email !== 'string') {
        res.status(400).json({ message: 'Missing or invalid email param' });
        return;
    }

    // Simple email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Invalid email format' });
        return;
    }
    next();
}
