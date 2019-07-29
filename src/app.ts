import express, { Application } from 'express';
import dotenv from 'dotenv';

import connectToDatabase from './database/connect';
import UrlRouter from './routes/url';

dotenv.config();

const app: Application = express();

const { 
  PORT = 5000,
  DATABASE_URL,
  DATABASE_NAME,  
} = process.env;

connectToDatabase(`${DATABASE_URL}${DATABASE_NAME}`);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', UrlRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});