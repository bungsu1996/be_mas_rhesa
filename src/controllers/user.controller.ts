import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "./../models/user.models";

/**
 * ROLE
 * 0 = ADMIN/ KEPALA SATPAM
 * 1 = USER/SATPAM
 * 
 */

class UserControllers {
  static async userCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, gender } = req.body;
      const hashPass = bcrypt.genSaltSync(10);
      const hashedPass = bcrypt.hashSync(password, hashPass);
      const result = await UserModel.create({
        name: name,
        email: email,
        password: hashedPass,
        gender: gender,
      });
      const body = {
        message: "SUCCESS_CREATE_USER",
        data: result,
      };
      res.status(201).json(body)
    } catch (error) {
      next(error)
    }
  }

  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserModel.find();
      if (!result || result.length < 1) {
        res.status(404).json({ message: "USERS_NOT_FOUND" })
      } else {
        res.status(200).json({ message: result })
      }
    } catch (error) {
      next(error)
    }
  }

  static async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await UserModel.findById(id);
      if (!result) {
        res.status(401).json({ message: "USER_NOT_FOUND" })
      } else {
        res.status(200).json({ message: result })
      }
    } catch (error) {
      next(error)
    }
  }
}

export default UserControllers;