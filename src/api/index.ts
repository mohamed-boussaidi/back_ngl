import express, { Response } from 'express';
import logger from '../utils/logger';

const router = express.Router();

// Health Check
router.get('/health', (_, res: Response) => {
  logger.info('+ Health Check Test +');
  return res.sendStatus(200);
});

export default router;
