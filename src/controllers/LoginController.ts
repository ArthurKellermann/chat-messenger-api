import User from '../models/User';
import { Request, Response } from 'express';

class LoginController {
  async auth(req: Request, res: Response): Promise<Response> {
    const { email = '', password = '' } = req.body;
    if (!email || !password) return res.status(401).json({ message: 'Invalid Login. Check username and password' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'The user does not exist' });

    if (!(await user.passwordIsValid(password))) return res.status(401).json({ message: 'Password does not match' });
    const token = await user.generateToken();

    return res.status(200).json({
      message: `Hello ${user.name}`,
      token,
    });
  }
}

export default new LoginController();
