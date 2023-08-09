import { Response } from 'express';
import User from '../models/User';
import Message from '../models/Message';
import { Request as ExpressRequest } from 'express';
import { UserInterface } from '../interfaces/userInterface';
import MessageService from '../services/MessageService';
import UserService from '../services/UserService';

interface Request extends ExpressRequest {
  user?: UserInterface;
  userChat?: UserInterface;
}

class UserController {
  public async storeUser(req: Request, res: Response): Promise<Response> {
    try {
      if (await UserService.userExist(req.body.email)) {
        return res.status(400).json({ message: 'The email already exists' });
      }
      const { name, email, password } = req.body;
      const userImage = req.file?.path;

      const user = await User.create({ name, email, password, userImage });

      return res.status(201).json(user);
    } catch (e) {
      return res.status(400).json({ error: 'Check the request fields' });
    }
  }

  public async getUserInfobyId(req: Request, res: Response): Promise<Response> {
    const userChatInfo = req.userChat;
    return res.status(200).json(userChatInfo);
  }

  public async getLastMessagesFromEachUser(req: Request, res: Response): Promise<Response> {
    const loggedUserId = req.user?._id;

    const users = await User.find({ _id: { $ne: loggedUserId } });

    const lastMessagesFromEachUser = await Promise.all(
      users.map(async (user) => {
        const messages = await Message.find({
          $or: [
            { $and: [{ sender: loggedUserId }, { addressee: user._id }] },
            { $and: [{ sender: user._id }, { addressee: loggedUserId }] },
          ],
        })
          .sort('-createdAt')
          .limit(1);
        return MessageService.getUserMessageResult(messages, user);
      }),
    );

    const messagesInOrder = lastMessagesFromEachUser.sort((a, b) => {
      const dateA = a.lastMessageDate?.getTime() || 0;
      const dateB = b.lastMessageDate?.getTime() || 0;

      return dateB - dateA;
    });

    return res.status(200).json(messagesInOrder);
  }
}

export default new UserController();
