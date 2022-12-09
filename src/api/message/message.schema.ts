import { object, string, TypeOf } from 'zod';

// Send Message Schema
export const sendMessageSchema = {
  body: object({
    messageContent: string({
      required_error: 'Message is required',
    }),
    messageTo: string({
      required_error: 'Message to is required',
    }),
  }),
};
// Input Types
export type SendMessageBody = TypeOf<typeof sendMessageSchema.body>;
