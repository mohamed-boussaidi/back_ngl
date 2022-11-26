import mongoose from 'mongoose';
import logger from './logger';

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/db-ngl';
export async function connect() {
  try {
    await mongoose.connect(DB_URI as string);
    logger.info('Connected to database');
  } catch (e) {
    logger.error(e, 'Failded to connect to database');
    process.exit(1);
  }
}
export async function disconnect() {
  await mongoose.connection.close();
  logger.info('Disconneced from database');
  return;
}
