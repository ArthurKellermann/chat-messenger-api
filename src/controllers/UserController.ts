import { Request, Response } from 'express';
import User from '../models/User';

async function userExist(email: string): Promise<boolean> {
  const users = await User.find({ email });
  if (users.length === 0) return false;
  return true;
}

class UserController {
  public async storeUser(req: Request, res: Response): Promise<Response> {
    try {
      if (await userExist(req.body.email)) return res.status(400).json({ message: 'The email already exists' });
      const user = await User.create(req.body);
      const { _id, name, email, image } = user;
      return res.status(201).json({ user: { id: _id, name, email, image } });
    } catch (e) {
      return res.status(400).json({ error: 'Check the request fields' });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, password, avatar } = req.body;
    const user = await User.findById(id);

    if (!user) return res.status(400).json({ message: 'User does not exist' });

    await User.findByIdAndUpdate(id, { name, password, avatar }, { new: true });
    return res.status(200).json({ message: 'Successfully updated user' });
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
      }
      await User.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Successfully deleted user' });
    } catch (e) {
      return res.status(400).json({ error: 'Check the request fields' });
    }
  }
}

export default new UserController();
