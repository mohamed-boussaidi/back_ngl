import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import router from './api';
import deserializeUser from './middleware/deserializeUser';

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
app.use(deserializeUser);

// Routes
app.use('/api', router);

// App
export default app;
