import { Application } from "express";
import app from "./app";
import * as dotenv from 'dotenv';
dotenv.config();

class Server {
  public app: Application;
  constructor() {
    this.app = app;
  };
};

const startServer = () => {
  try {
    const server = new Server().app;
    const port = process.env.PORT || 5000;
    server.listen(port, () => {
      console.log(`[  🪐  ]: Connected to Server http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
    throw new Error("[  💥  ]: Error to Connect Server!");
  };
};
startServer();
