import { Request, Response, NextFunction } from 'express';

export function validateContactForm(req: Request, res: Response, next: NextFunction): void {
  const { name, email, phone, subject, message } = req.body;

  // Basic presence check
  if (!name || !email || !phone || !subject || !message) {
    res.status(400).json({ message: 'All fields are required.' });
    return;
  }

  // Type checks
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof phone !== 'string' ||
    typeof subject !== 'string' ||
    typeof message !== 'string'
  ) {
    res.status(400).json({ message: 'Invalid data types provided.' });
    return;
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Invalid email format.' });
    return;
  }

  // Optional: basic phone number pattern (only digits, optional +, spaces, dashes)
  const phoneRegex = /^[\d+\-\s]{7,20}$/;
  if (!phoneRegex.test(phone)) {
    res.status(400).json({ message: 'Invalid phone number format.' });
    return;
  }

  next();
}
