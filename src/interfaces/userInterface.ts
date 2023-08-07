import { Document, Types } from 'mongoose';

export interface UserInterface extends Document {
  _id: Types.ObjectId | string;
  name?: string;
  email: string;
  password?: string;
  image: string;
  passwordIsValid(password: string): Promise<boolean>;
  generateToken(id: string, email: string): Promise<string>;
}
