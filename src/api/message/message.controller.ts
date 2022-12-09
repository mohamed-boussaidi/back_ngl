import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { findUserById } from '../user/user.service';
import { SendMessageBody } from './message.schema';
import { sendMessage } from './message.service';

// Send Message Handler
export async function sendMessageHandler(
  req: Request<{}, {}, SendMessageBody>,
  res: Response
) {
  const user = res.locals.user;
  const { messageContent, messageTo } = req.body;

  try {
    const sendToUser = await findUserById(messageTo);
    if (!sendToUser) {
      return res.status(StatusCodes.BAD_REQUEST);
    }
    await sendMessage({
      message: messageContent,
      messageFrom: user._id,
      messageTo: sendToUser._id,
    });
    return res.status(StatusCodes.OK).send('Message sent');
  } catch (e: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
