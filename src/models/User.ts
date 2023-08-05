import { Schema, model, Document } from 'mongoose';

interface UserInterface extends Document {
  name: string;
  emai: string;
  password: string;
  avatar: string;
}
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

export default model<UserInterface>('User', UserSchema);
