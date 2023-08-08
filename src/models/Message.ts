import { Schema, model, Model } from 'mongoose';
import { MessageInterface } from '../interfaces/messageInterface';

interface StaticMessage extends Model<MessageInterface> {
  findChat(loggedUserId: string, userChatId: string): Promise<MessageInterface[]>;
}

const MessageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    addressee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

MessageSchema.statics.findChat = function (loggedUserId: string, userChatId: string) {
  return this.find({
    $or: [
      { $and: [{ sender: loggedUserId }, { addressee: userChatId }] },
      { $and: [{ sender: userChatId }, { addressee: loggedUserId }] },
    ],
  });
};

export default model<MessageInterface, StaticMessage>('Message', MessageSchema);
