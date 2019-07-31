import config from 'config';
import App from './app.module';
import UrlController from './controllers/url.controller';

const port: number = <number>(process.env.PORT || config.get('port') || 5000);

const app = new App(
  [
    new UrlController()
  ],
  port
);

app.listen();