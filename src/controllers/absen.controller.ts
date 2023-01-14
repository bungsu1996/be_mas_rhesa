import { Request, Response, NextFunction } from "express";
import AbsenModel from "../models/absen.models";
import UserModel from "../models/user.models";

class AbsenController {
  static async createAbsen(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const find = await UserModel.findById(id)
      if (!find) {
        res.status(404).json({ message: "USER_NOT_FOUND" })
      } else {
        const result = await AbsenModel.create({
          user: id
        })
        const search = await AbsenModel.findById(result.id).populate({ path: "user", select: "name" })
        res.status(201).json({ message: "SUCCESS_ABSEN", data: search })
      }
    } catch (error) {
      next(error)
    }
  }

  static async getAllAbsen(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AbsenModel.find().populate({ path: "user", select: "name email" });
      if (!result) {
        res.status(404).json({ message: "ABSENS_NOT_FOUND" })
      } else {
        res.status(200).json({ message: "SUCCESS", data: result })
      }
    } catch (error) {
      next(error)
    }
  }
}

export default AbsenController;