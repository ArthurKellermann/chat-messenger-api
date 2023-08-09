import jwt from 'jsonwebtoken';
import { Schema, model } from 'mongoose';
import { UserInterface } from '../interfaces/userInterface';
import bcrypt from 'bcrypt';

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
  userImage: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', async function (next): Promise<void> {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  return next();
});

UserSchema.methods.passwordIsValid = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = async function (): Promise<string> {
  const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
  const jwtExpiration = process.env.JWT_EXPIRATION || '3h';

  const token = jwt.sign(
    {
      _id: String(this._id),
      name: this.name,
      email: this.email,
    },
    jwtSecret,
    {
      expiresIn: jwtExpiration,
    },
  );

  return token;
};
export default model<UserInterface>('User', UserSchema);
