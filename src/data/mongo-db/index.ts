import mongoose from 'mongoose';
import envs from '../../config/envs';

const dbConnection = async () => {
  try {
    await mongoose.connect(envs.MONGO_URL, {
      ssl: envs.PROD && !envs.PROD,
    });
    console.log('- Connected to the database adventure (MongoDB)');
  } catch (error) {
    console.log(error);
    throw new Error('Error in the DB');
  }
};

export default dbConnection;
