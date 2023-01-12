import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

class MongoDbConnect {
  constructor(){}
  public static toConnect = async () => {
    try {
      const mongoDbPathUrl = `${process.env.DB_HOST}:${process.env.DB_PORT}/`
      const mongoDbPort = "Satpam_App";
      mongoose.set('strictQuery', true);
      await mongoose.connect(`${mongoDbPathUrl}${mongoDbPort}`)
      console.log("[  🪐  ]: Database Connected")
    } catch (error) {
      console.log(error)
    }
  }
}

export default MongoDbConnect;