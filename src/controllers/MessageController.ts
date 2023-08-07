import { Request, Response } from 'express';
import Message from '../models/Message';
class MessageController {
  public async send(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { text } = req.body;

    const message = await Message.create({
      text,
      sender: ' ',
      addressee: id,
    });
  }
}

export default new MessageController();
