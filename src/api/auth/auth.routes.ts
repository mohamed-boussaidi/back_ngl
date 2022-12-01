import express from 'express';
import { processRequestBody } from 'zod-express-middleware';
// import { loginHandler } from './auth.controller';
import { loginSchema } from './auth.schema';

const router = express.Router();

// Login Route
router.post('/login', processRequestBody(loginSchema.body));

export default router;
