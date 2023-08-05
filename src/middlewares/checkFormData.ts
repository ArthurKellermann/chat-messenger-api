import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

export default function (req: Request, res: Response, next: NextFunction): void {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) {
    res.status(400).json({ message: 'The email must be valid' });
    return;
  }

  if (password.length < 3 || password.length > 50) {
    res.status(400).json({ message: ' The password must be between 3 to 50 characters' });
    return;
  }

  next();
}
