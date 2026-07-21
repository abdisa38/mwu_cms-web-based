import Conversation, { IConversation } from '../models/conversation.model';
import Message, { IMessage } from '../models/message.model';
import { socketManager } from '../../../../socket/socket.manager';
import { NotFoundError, ForbiddenError } from '../../../../core/errors';
import mongoose from 'mongoose';

export class MessageService {

  public async getOrCreateConversation(participants: string[], clearanceId?: string): Promise<IConversation> {
    const participantIds = participants.map((p: any) => new mongoose.Types.ObjectId(p));

    let conv = await Conversation.findOne({
      participants: { $all: participantIds, $size: participantIds.length }
    }).populate('participants', 'firstName lastName role profileUrl');

    if (!conv) {
      conv = await (new Conversation({ participants: participantIds, clearanceId })).save();
      await conv.populate('participants', 'firstName lastName role profileUrl');
      
      // Notify participants
      participantIds.forEach((id: mongoose.Types.ObjectId) => {
        socketManager.sendToUser(id.toString(), 'conversation:created', conv);
      });
    }

    return conv;
  }

  public async getMyConversations(userId: string) {
    return Conversation.find({ participants: new mongoose.Types.ObjectId(userId), isArchived: false })
      .populate('participants', 'firstName lastName role profileUrl')
      .populate('lastMessage')
      .sort({ updatedAt: -1 });
  }

  public async sendMessage(senderId: string, conversationId: string, content: string): Promise<IMessage> {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) throw new NotFoundError('Conversation not found');

    if (!conversation.participants.some((p: any) => p.toString() === senderId)) {
      throw new ForbiddenError('You are not a participant in this conversation');
    }

    const message = await (new Message({
      conversationId,
      senderId,
      content,
      isDelivered: true,
      deliveredAt: new Date()
    })).save();

    // Update conversation lastMessage & updatedAt
    conversation.lastMessage = message._id as mongoose.Types.ObjectId;
    conversation.updatedAt = new Date();
    await conversation.save();

    // Broadcast to other participants
    conversation.participants.forEach((p: any) => {
      const pId = p.toString();
      if (pId !== senderId) {
        socketManager.sendToUser(pId, 'message:new', message);
      }
    });

    return message;
  }

  public async getMessages(conversationId: string, userId: string, skip = 0, limit = 50) {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation || !conversation.participants.some((p: any) => p.toString() === userId)) {
      throw new ForbiddenError('Not authorized');
    }

    return Message.find({ conversationId })
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit)
      .populate('senderId', 'firstName lastName role profileUrl');
  }

  public async markAsRead(conversationId: string, userId: string) {
    await Message.updateMany(
      { conversationId, senderId: { $ne: new mongoose.Types.ObjectId(userId) }, isRead: false },
      { $set: { isRead: true, readAt: new Date() } }
    );
    
    // In a real app we'd fetch the exact messages to emit 'message:read', but emitting a general event works too
    const conversation = await Conversation.findById(conversationId);
    conversation?.participants.forEach((p: any) => {
      socketManager.sendToUser(p.toString(), 'conversation:read', { conversationId, readerId: userId });
    });
  }
}
