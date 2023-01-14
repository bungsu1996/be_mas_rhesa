import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AdminModel from "../models/admin.models";
import UserModel from "../models/user.models";
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId?: Record<string, any>;
    }
  }
}

class AuthMiddlewares {
  static authentication(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header("Authorization")!.replace("Bearer ", "");
      if (!token) {
        throw { name: "MISSING_TOKEN" };
      }
      const decodedToken = <any>jwt.verify(token, process.env.JWT_SECRET_KEY!);
      req.userId = <any>{ email: decodedToken.email, id: decodedToken.id };
      next();
    } catch (error) {
      res.status(401).json({ Message: "YOURE_NOT_AUTHENTICATED" });
    }
  }

  static async isAdmin(req: Request, res: Response, next: NextFunction) {
    const { userId } = req;
    try {
      const result = await AdminModel.findById(userId?.id);
      if (!result || result.role != 0) {
        res.status(401).json({ message: "REQUIRE_ADMIN_ROLE" });
        return;
      }
      next();
      return;
    } catch (error) {
      res.status(401).json({ Message: "YOU_ARE_NOT_AUTHORIZED!" });
    }
  }

  static async isUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req;
    try {
      const result = await UserModel.findById(userId?.id);
      if (!result || result.role != 1) {
        res.status(401).json({ message: "REQUIRE_USER_ROLE" });
        return;
      }
      next();
      return;
    } catch (error) {
      res.status(401).json({ Message: "YOU_ARE_NOT_AUTHORIZED!" });
    }
  }

}

export default AuthMiddlewares;
