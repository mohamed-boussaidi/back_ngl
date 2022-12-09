import { Message, MessageModel } from './message.model';

// Send Message
export function sendMessage(message: Partial<Message>) {
  return MessageModel.create(message);
}
