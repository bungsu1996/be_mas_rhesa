import { Router } from "express";

import UserControllers from "./../controllers/user.controller";
import AdminControllers from "../controllers/admin.controller";
import JadwalControllers from "./../controllers/jadwal.controller";

class Routes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.admins();
    this.users();
    this.jadwals();
  }
  public admins = () => {
    this.router.post("/admins/create", AdminControllers.createAdmin);
    this.router.get("/admins/", AdminControllers.getAllAdmins);
    this.router.get("/admins/:id", AdminControllers.getAdmin);
  };
  public users = () => {
    this.router.post("/users/create", UserControllers.userCreate);
    this.router.get("/users/", UserControllers.getAllUsers);
    this.router.get("/users/:id", UserControllers.getUser);
  };
  public jadwals = () => {
    this.router.post("/jadwals/create", JadwalControllers.createJadwal);
    this.router.get("/jadwals/", JadwalControllers.getAllJadwals);
    this.router.get("/jadwals/:id", JadwalControllers.getJadwals);
  };
}

export default new Routes().router;