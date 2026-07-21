import mongoose, { Schema, Document } from 'mongoose';

export interface IConversation extends Document {
  participants: mongoose.Types.ObjectId[];
  clearanceId?: mongoose.Types.ObjectId; // Optional link to a specific clearance context
  lastMessage?: mongoose.Types.ObjectId; // Reference to the most recent message for quick sorting
  isArchived: boolean;
  updatedAt: Date;
}

const ConversationSchema = new Schema<IConversation>({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  clearanceId: { type: Schema.Types.ObjectId, ref: 'Clearance' },
  lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
  isArchived: { type: Boolean, default: false }
}, { timestamps: true });

// Ensure we can query fast by participant
ConversationSchema.index({ participants: 1 });

export default mongoose.models.Conversation || mongoose.model<IConversation>('Conversation', ConversationSchema);
