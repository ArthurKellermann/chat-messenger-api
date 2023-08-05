import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import userRoutes from './routes/userRoutes';
config();

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }
  private database(): void {
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL is not defined');
    }
    mongoose.connect(process.env.MONGO_URL);
  }

  private routes(): void {
    this.express.use('/register', userRoutes);
  }
}

export default new App().express;
