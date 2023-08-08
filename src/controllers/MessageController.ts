import { Request as ExpressRequest, Response } from 'express';
import Message from '../models/Message';
import { UserInterface } from '../interfaces/userInterface';
import User from '../models/User';
import { MessageInterface } from '../interfaces/messageInterface';

interface Request extends ExpressRequest {
  user?: UserInterface;
  userChat?: UserInterface;
}

class MessageController {
  public async sendMessage(req: Request, res: Response): Promise<Response> {
    const addresseeId = req.params.id;
    const { text } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: 'User is not authenticated' });
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
    const loggedUserId = req.user._id;

    const messages = await Message.find({ sender: loggedUserId }).populate('sender addressee', 'name');

    const filteredMessages = messages.map((message) => {
      return {
        _id: message._id,
        text: message.text,
        sender: message.sender,
        addressee: message.addressee,
        createdAt: message.createdAt,
      };
    });

    return res.status(200).json({ filteredMessages });
  }

  public async getMessagesByUserId(req: Request, res: Response): Promise<Response> {
    const loggedUserId = req.user?._id;
    const userChatId = req.userChat?._id;
    const messages = await Message.findChat(String(loggedUserId), String(userChatId));

    const chatMessages = messages.map((message: MessageInterface) => {
      return {
        text: message.text,
        createdAt: message.createdAt,
        isSender: message.sender == String(loggedUserId),
      };
    });

    return res.status(200).json({ chatMessages });
  }
}

export default new MessageController();
