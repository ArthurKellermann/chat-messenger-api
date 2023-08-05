import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
  }
}

export default new App().express;
