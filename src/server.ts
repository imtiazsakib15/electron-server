import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);

    server = app.listen(config.PORT, () => {
      console.log(`Server is listening on port ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log('unhandledRejection detected!!! 👹👹👹');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on('uncaughtException', () => {
  console.log('uncaughtException detected!!! 👹👹👹');
  process.exit(1);
});
