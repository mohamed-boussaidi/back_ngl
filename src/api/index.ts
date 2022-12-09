import express, { Response } from 'express';
import logger from '../utils/logger';

import authRouter from './auth/auth.routes';
import userRouter from './user/user.routes';
import messageRouter from './message/message.routes';

const router = express.Router();

// Health Check
router.get('/health', (_, res: Response) => {
  logger.info('+ Health Check Test +');
  return res.sendStatus(200);
});

// Auth Router
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/message', messageRouter);

export default router;
