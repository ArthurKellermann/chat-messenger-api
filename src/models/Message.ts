import { Schema, model } from 'mongoose';
import { MessageInterface } from '../interfaces/messageInterface';

const MessageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      requried: true,
    },
    addressee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      requried: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<MessageInterface>('Message', MessageSchema);
