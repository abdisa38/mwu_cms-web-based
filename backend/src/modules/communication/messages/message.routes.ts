import { Router } from 'express';
import { MessageController } from './message.controller';
import { authenticate } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new MessageController();

router.use(authenticate);

// Conversations
router.get('/conversations', controller.getConversations);
router.post('/conversations', controller.createConversation);
router.patch('/conversations/:conversationId/read', controller.markAsRead);

// Messages
router.get('/conversations/:conversationId/messages', controller.getMessages);
router.post('/messages', controller.sendMessage);

export default router;
