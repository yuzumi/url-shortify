import express, { Application } from 'express';
import config from 'config';

import connectToDatabase, { IDatabaseConnectionConfig } from './database/connect';
import UrlRouter from './routes/url';

const app: Application = express();

const port: number | string = process.env.PORT || config.get('port') || 5000;
const database: IDatabaseConnectionConfig = config.get('database');

connectToDatabase(database);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', UrlRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});