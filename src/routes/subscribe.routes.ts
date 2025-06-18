import { Router } from 'express';
import { subscribeController } from '../controllers/subscribe.controller';
import { subscribeMiddleware } from '../middleware/subscribe.middleware';

const router = Router();


// Apply the middleware to the subscription route
router.post('/', subscribeMiddleware, subscribeController);

export default router;