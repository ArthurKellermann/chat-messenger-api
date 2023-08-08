import { Document } from 'mongoose';

export interface MessageInterface extends Document {
  text?: string;
  sender?: string;
  addressee?: string;
  createdAt?: Date;
}
