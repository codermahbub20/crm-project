import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`CRM Project Server Listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
