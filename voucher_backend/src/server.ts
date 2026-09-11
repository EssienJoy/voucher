import dotenv from 'dotenv';
import process from 'process';
import mongoose from 'mongoose';

dotenv.config({ path: `.env.local` });

const { env } = await import('./config/env.js');
const { default: app } = await import('./app.js');

process.on('uncaughtException', (err: Error) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

const DB = env.DATABASE_URI.replace('<PASSWORD>', env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

// Start Server
const port = env.PORT ?? 3001;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err: Error) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
