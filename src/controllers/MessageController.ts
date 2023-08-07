import { Request as ExpressRequest, Response } from 'express';
import Message from '../models/Message';
import { UserInterface } from '../interfaces/userInterface';
import User from '../models/User';

interface Request extends ExpressRequest {
  user?: UserInterface;
}

class MessageController {
  public async send(req: Request, res: Response): Promise<Response> {
    const addresseeId = req.params.id;
    const { text } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: 'User is not authenticated' });
    }

    if (!addresseeId) {
      return res.status(401).json({ error: 'Check the request params' });
    }

    const sender = await User.findById(req.user._id);
    const addressee = await User.findById(addresseeId);

    const message = await Message.create({
      text,
      sender: req.user._id,
      addressee: addresseeId,
    });

    return res.status(200).json(message);
  }
}

export default new MessageController();
