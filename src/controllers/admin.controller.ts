import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import AdminModel from "./../models/admin.models";

/**
 * ROLE
 * 0 = ADMIN/ KEPALA SATPAM
 * 1 = USER/SATPAM
 * 
 */

class AdminControllers {
  static async createAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const hashPass = bcrypt.genSaltSync(10);
      const hashedPass = bcrypt.hashSync(password, hashPass);
      const result = await AdminModel.create({
        name: name,
        email: email,
        password: hashedPass,
      });
      const body = {
        message: "SUCCESS_CREATE_ADMIN",
        data: result,
      };
      res.status(201).json(body)
    } catch (error) {
      next(error)
    }
  }

  static async getAllAdmins(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AdminModel.find();
      if (!result || result.length < 1) {
        res.status(404).json({ message: "ADMINS_NOT_FOUND" })
      } else {
        res.status(200).json({ message: result })
      }
    } catch (error) {
      next(error)
    }
  }

  static async getAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await AdminModel.findById(id);
      if (!result) {
        res.status(401).json({ message: "ADMIN_NOT_FOUND" })
      } else {
        res.status(200).json({ message: result })
      }
    } catch (error) {
      next(error)
    }
  }

  static async adminLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const findAcc = await AdminModel.findOne({
        where: {
          email: email,
        }
      });
      
      if (!findAcc) {
        res.status(401).json({ message: "EMAIL_NOT_FOUND" })
      } else {
        const checkPassword = bcrypt.compareSync(password, findAcc.password);
        if (!checkPassword) {
          throw { name: "WRONG_PASSWORD" };
        }
      }
      const token = jwt.sign(
        {
          id: findAcc!._id,
          name: findAcc!.name,
          email: findAcc!.email,
          role: findAcc!.role,
        },
        process.env.JWT_SECRET_KEY!,
      );
      res.status(200).json({ message: "LOGIN_SUCCESS", token: token });
    } catch (error) {
      next(error)
    }
  }
}

export default AdminControllers;