import { Request, Response, NextFunction } from "express";

import JadwalModel from "./../models/jadwal.models";

class JadwalControllers {
  static async createJadwal(req: Request, res: Response, next: NextFunction) {
    try {
      const { tanggal, user } = req.body;
      const parseTanggal = new Date(tanggal).toLocaleDateString();
      const result = await JadwalModel.create({
        tanggal: parseTanggal,
        user: user,
      })
      if (!tanggal || tanggal == null) {
        res.status(500).json({ message: "TANGGAL_REQUIRED" })
      } else if (!user || user.length < 1) {
        res.status(500).json({ message: "USER_REQUIRED" })
      } else {
        const body = {
          message: "SUCCESS_CREATE_JADWAL",
          data: result,
        }
        res.status(201).json(body)
      }
    } catch (error) {
      next(error)
    }
  }

  static async getAllJadwals(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await JadwalModel.find().populate({ path: "user", select: "name email"});
      if (!result || result.length < 1) {
        res.status(404).json({ message: "JADWALS_NOT_FOUND" })
      } else {
        res.status(200).json({ message: result })
      }
    } catch (error) {
      next(error)
    }
  }

  static async getJadwals(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await JadwalModel.findById(id).populate({ path: "user", select: "name email" })
      if (!result) {
        res.status(404).json({ message: "JADWAL_NOT_FOUND" })
      } else {
        res.status(200).json({ message: result })
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteJadwal(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      await JadwalModel.findByIdAndDelete(id);
      res.status(200).json({ message: "JADWAL_HAS_BEEN_DELETED" })
    } catch (error) {
      next(error)
    }
  }

  static async updateJadwal(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { tanggal, user } = req.body;
      const parseTanggal = new Date(tanggal).toLocaleDateString();
      const result = await JadwalModel.findByIdAndUpdate(id, {
        tanggal: parseTanggal,
        user: user,
      }, { new: true })
      const body = {
        message: "SUCCESS_UPDATE_JADWAL",
        data: result
      }
      res.status(201).json(body)
    } catch (error) {
      next(error)
    }
  }
}

export default JadwalControllers;