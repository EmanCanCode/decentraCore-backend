import { Request, Response, NextFunction } from 'express';

/**
 * Logs each request to the finance endpoints.
 */
export function financeLogger(req: Request, res: Response, next: NextFunction): void {
    console.log(`[Finance] ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
    next();
}
