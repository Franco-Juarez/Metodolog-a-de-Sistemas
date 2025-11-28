import { Router } from 'express';
import { MessageController } from '../controllers/Message.Controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// Message/Comments endpoints (en desarrollo)
router.post('/', authenticateToken, MessageController.create);
router.get('/publication/:publicationId', MessageController.getByPublicationId);
router.put('/:id', authenticateToken, MessageController.update);
router.delete('/:id', authenticateToken, MessageController.delete);

export default router;
