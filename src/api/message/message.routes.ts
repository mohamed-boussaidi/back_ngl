import express from 'express';
import { processRequestBody } from 'zod-express-middleware';
import requireUser from '../../middleware/requireUser';
import { sendMessageHandler } from './message.controller';
import { sendMessageSchema } from './message.schema';
// import { processRequestBody } from 'zod-express-middleware';

const router = express.Router();

// Login Route
router.post(
  '/send',
  requireUser,
  processRequestBody(sendMessageSchema.body),
  sendMessageHandler
);

export default router;
