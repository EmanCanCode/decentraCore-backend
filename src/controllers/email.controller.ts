import { Request, Response } from 'express';
import { EmailService } from '../services/email.service';

export async function emailController(req: Request, res: Response) {
    try {
        const { name, email, phone, subject, message } = req.body;
        await new EmailService().sendContactEmail(
            name as string,
            email as string,
            phone as string,
            subject as string,
            message as string,
        );
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (err) {
        console.error('Error in emailController:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}