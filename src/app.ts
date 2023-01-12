import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from 'dotenv';
dotenv.config();

import MongoDbConnect from "./configs/mongodb.connect";
import Routes from "./routes/routes";

class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.plugin();
    this.route();
    this.middlewares();
  };
  protected plugin = () => {
    MongoDbConnect.toConnect();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
      next();
    });
    this.app.use(morgan("dev"));
  };
  protected route = () => {
    this.app.get("/", (req, res) => {
      res.status(200).json({ message: "Satpam App" })
    })
    this.app.use(Routes);
  };
  protected middlewares = () => {
    
  };
};

const app = new App().app;
export default app;