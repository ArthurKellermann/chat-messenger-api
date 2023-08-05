import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!validator.isEmail(email)) return res.status(400).json({ message: 'The email must be valid' });
  if (password.length < 3 || password.length > 50) {
    return res.status(400).json({ message: ' The password must be between 3 to 50 characters' });
  }
  return next();
};
