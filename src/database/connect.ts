import mongoose from 'mongoose';

export interface IDatabaseConnectionConfig {
  url: string;
  name: string;
};

export const buildUri = (config: IDatabaseConnectionConfig): string => {
  return `${config.url}${config.name}`;
};

export default async function connect(config: IDatabaseConnectionConfig): Promise<void> {
  try {
    const uri: string = buildUri(config);

    await mongoose.connect(uri, { useNewUrlParser: true });

    console.log('Database connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);    
  }
};