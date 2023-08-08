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
      sender: sender?._id,
      addressee: addressee?._id,
    });

    await message.populate('sender addressee', 'name');

    return res.status(200).json(message);
  }

  public async getAllMessages(req: Request, res: Response): Promise<Response> {
    if (!req.user) {
      return res.status(401).json({ error: 'User is not authenticated' });
    }
    const senderId = req.user._id;

    const messages = await Message.find({ sender: senderId }).populate('sender addressee', 'name');
    return res.status(200).json({ messages });
  }
}

export default new MessageController();
