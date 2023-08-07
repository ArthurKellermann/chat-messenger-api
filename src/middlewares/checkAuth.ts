import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { UserInterface } from '../interfaces/userInterface';

interface Request extends ExpressRequest {
  user?: UserInterface;
}

class checkAuth {
  public async authUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'User must be logged in' });
    }

    const [, token] = authorization.split(' ');

    try {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }

      const userData = jwt.verify(token, process.env.JWT_SECRET) as UserInterface;
      const { _id } = userData;

      const user = await User.findById(_id);

      if (!user) return res.status(401).json({ errors: 'User does not exist' });

      req.user = user;

      return next();
    } catch (e) {
      return res.status(401).json({ errors: 'User must be logged in' });
    }
  }
}

export default new checkAuth();
