import { Router } from "express";

import UserControllers from "./../controllers/user.controller";
import AdminControllers from "../controllers/admin.controller";
import JadwalControllers from "./../controllers/jadwal.controller";
import AbsenController from "../controllers/absen.controller";
import AuthMiddlewares from "../middlewares/auth.middlewares";

class Routes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.beforeAuth();
    this.admins();
    this.users();
  }
  public beforeAuth = () => {
    this.router.post("/admins/login", AdminControllers.adminLogin);
    this.router.post("/admins/create", AdminControllers.createAdmin);
    this.router.post("/login/user", UserControllers.userLogin);
  }
  public admins = () => {
    this.router.get("/admins/", AuthMiddlewares.authentication, AuthMiddlewares.isAdmin, AdminControllers.getAllAdmins);
    this.router.get("/admins/:id", AuthMiddlewares.authentication, AdminControllers.getAdmin);
    
    this.router.post("/users/create", AuthMiddlewares.authentication, UserControllers.userCreate);
    this.router.get("/users/", AuthMiddlewares.authentication, UserControllers.getAllUsers);
    this.router.get("/users/:id", AuthMiddlewares.authentication, UserControllers.getUser);

    this.router.get("/absens/", AuthMiddlewares.authentication, AbsenController.getAllAbsen);

    this.router.post("/jadwals/create", AuthMiddlewares.authentication, JadwalControllers.createJadwal);
    this.router.get("/jadwals/", AuthMiddlewares.authentication, JadwalControllers.getAllJadwals);
    
    this.router.get("/jadwals/:id", AuthMiddlewares.authentication, JadwalControllers.getJadwals);
    this.router.delete("/jadwals/delete", AuthMiddlewares.authentication, JadwalControllers.deleteJadwal);
    this.router.post("/jadwals/:id", AuthMiddlewares.authentication, JadwalControllers.updateJadwal);
  };
  public users = () => {
    this.router.post("/absen/:id", AuthMiddlewares.authentication, AbsenController.createAbsen);
    this.router.get("/jadwals/:id", AuthMiddlewares.authentication, JadwalControllers.getJadwals);
  };
}

export default new Routes().router;