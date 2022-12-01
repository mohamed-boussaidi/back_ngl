import express from 'express';
import { getUserHandler } from './user.controller';
import requireUser from '../../middleware/requireUser';

const router = express.Router();

// User Profile Route
router.get('/profile', requireUser, getUserHandler);

export default router;
