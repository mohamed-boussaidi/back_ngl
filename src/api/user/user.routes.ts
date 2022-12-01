import express from 'express';
// import { processRequestBody } from 'zod-express-middleware';
import { getUserHandler } from './user.controller';
// import requireUser from '../../middleware/requireUser';

const router = express.Router();

// User Info Route
router.get('/me', /*requireUser,*/ getUserHandler);

export default router;
