import dotenv from 'dotenv';
dotenv.config();
import app from './src/main';
import { connect, disconnect } from './src/utils/db';
import logger from './src/utils/logger';

// Start Server
const PORT = process.env.PORT || 4000;
const ORIGIN = process.env.ORIGIN || 'http://localhost';
const server = app.listen(PORT, async () => {
  logger.info(`Server listinig at ${ORIGIN}:${PORT}`);
  await connect();
});

// GracefulShutdown
function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    server.close();
    await disconnect();
    logger.info('Server is down');
    process.exit(0);
  });
}
const signals = ['SIGTERM', 'SIGINT'];
for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i]);
}
