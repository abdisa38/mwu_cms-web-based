import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  conversationId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  content: string;
  isRead: boolean;
  readAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  isDeleted: boolean; // Soft delete
}

const MessageSchema = new Schema<IMessage>({
  conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  readAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

// Pre-find hook to ignore soft-deleted messages
MessageSchema.pre<mongoose.Query<any, any>>(/^find/, function(next: any) {
  // @ts-ignore
  this.where({ isDeleted: { $ne: true } });
  next();
});

export default mongoose.model<IMessage>('Message', MessageSchema);
