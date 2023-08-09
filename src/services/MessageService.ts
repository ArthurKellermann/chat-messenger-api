import { MessageInterface } from '../interfaces/messageInterface';
import { UserInterface, SimpleUserMessage } from '../interfaces/userInterface';

class MessageService {
  public getUserMessageResult(messages: MessageInterface[], user: UserInterface): SimpleUserMessage {
    return {
      _id: user._id,
      name: user.name,
      image: user.image,
      lastMessage: messages[0]?.text || null,
      lastMessageDate: messages[0]?.createdAt || null,
    };
  }
}
export default new MessageService();
