import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import router from './api';

// Initials
const app = express();
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// Middlewares

// Routes
app.use('/api', router);

// App
export default app;
