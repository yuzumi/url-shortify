import express, { Application } from 'express';
import config from 'config';
import mongoose from 'mongoose';

import loggerMiddleware from './middleware/logger.middleware';
import errorHandlerMiddleware from './middleware/errorHandler.midleware';

import Controller from './interfaces/controller.interface';

export default class App {
  private app: Application;
  private port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    this.connectToDatabase();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    this.app.use(loggerMiddleware);
  }

  private initializeErrorHandling() {
    this.app.use(errorHandlerMiddleware);
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach(controller => {
      this.app.use(controller.path, controller.router);
    });
  }

  private async connectToDatabase(): Promise<void> {
    try {
      const uri: string = config.get('database.uri');

      await mongoose.connect(uri, { useNewUrlParser: true });

      console.log('Database connected');
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
