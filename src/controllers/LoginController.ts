import jwt from 'jsonwebtoken';
import User from '../models/User';
import { Request, Response } from 'express';

class LoginController {
  async auth(req: Request, res: Response): Promise<Response> {
    const { email = '', password = '' } = req.body;
    if (!email || !password) return res.status(401).json({ message: 'Invalid Login. Check username and password' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'The user does not exist' });

    if (!(await user.passwordIsValid(password))) return res.status(401).json({ message: 'Password does not match' });
    const { id } = user;

    const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
    const jwtExpiration = process.env.JWT_EXPIRATION || '3h';

    const token = jwt.sign({ id, email }, jwtSecret, {
      expiresIn: jwtExpiration,
    });

    return res.status(200).json({ user, token });
  }
}

export default new LoginController();
