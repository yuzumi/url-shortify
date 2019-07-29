import mongoose from 'mongoose';

const connectToDatabase = async (uri: string): Promise<void> => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true
    });

    console.log('Database connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectToDatabase;