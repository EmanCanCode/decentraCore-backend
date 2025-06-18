import { Router } from 'express';
import { emailController } from '../controllers/email.controller';
import { validateContactForm } from '../middleware/email.middleware';

const router = Router();

router.post('/', validateContactForm, emailController);

export default router;
