import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { UserInterface } from '../interfaces/userInterface';

interface Request extends ExpressRequest {
  user?: UserInterface;
  userChat?: UserInterface;
}

class checkAuth {
  public async authUserByToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'User must be logged in' });
    }

    const [, token] = authorization.split(' ');

    try {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }

      const { _id } = jwt.verify(token, process.env.JWT_SECRET) as UserInterface;

      const user = await User.findById(_id);

      if (!user) return res.status(401).json({ errors: 'User does not exist' });

      req.user = user;

      return next();
    } catch (e) {
      return res.status(401).json({ errors: 'User must be logged in' });
    }
  }

  public async authUserByParams(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!id) return res.status(401).json({ errors: 'Request params must be valid' });

      if (!user) return res.status(401).json({ errors: 'User does not exist' });

      req.userChat = user;
      return next();
    } catch (e) {
      return res.status(401).json({ errors: 'User is not valid' });
    }
  }
}

export default new checkAuth();
