import User from '../models/User';

class MessageService {
  public async userExist(email: string): Promise<boolean> {
    const users = await User.find({ email });
    if (users.length === 0) return false;
    return true;
  }
}
export default new MessageService();
