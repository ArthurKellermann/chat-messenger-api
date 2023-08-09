import { Document, Types } from 'mongoose';

export interface UserInterface extends Document {
  _id: Types.ObjectId | string;
  name?: string;
  email: string;
  password?: string;
  userImage: string;
  passwordIsValid(password: string): Promise<boolean>;
  generateToken(): Promise<string>;
}

export interface SimpleUserMessage {
  _id: Types.ObjectId | string;
  name?: string;
  userImage: string;
  lastMessage: string | null;
  lastMessageDate: Date | null;
}
