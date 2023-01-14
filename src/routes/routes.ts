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
    this.router.get("/admins/:id", AuthMiddlewares.authentication, AuthMiddlewares.isAdmin, AdminControllers.getAdmin);
    
    this.router.post("/users/create", AuthMiddlewares.authentication, AuthMiddlewares.isAdmin, UserControllers.userCreate);
    this.router.get("/users/", AuthMiddlewares.authentication, AuthMiddlewares.isAdmin, UserControllers.getAllUsers);
    this.router.get("/users/:id", AuthMiddlewares.authentication, AuthMiddlewares.isAdmin, UserControllers.getUser);

    this.router.get("/absens/", AuthMiddlewares.authentication, AuthMiddlewares.isAdmin, AbsenController.getAllAbsen);

    this.router.post("/jadwals/create", AuthMiddlewares.authentication, AuthMiddlewares.isAdmin, JadwalControllers.createJadwal);
    this.router.get("/jadwals/", AuthMiddlewares.authentication, AuthMiddlewares.isAdmin, JadwalControllers.getAllJadwals);
    
    this.router.get("/jadwals/:id", AuthMiddlewares.authentication, AuthMiddlewares.isAdmin, JadwalControllers.getJadwals);
    this.router.delete("/jadwals/delete", AuthMiddlewares.authentication, AuthMiddlewares.isAdmin, JadwalControllers.deleteJadwal);
    this.router.post("/jadwals/:id", AuthMiddlewares.authentication, AuthMiddlewares.isAdmin, JadwalControllers.updateJadwal);
  };
  public users = () => {
    this.router.post("/absen/", AuthMiddlewares.authentication, AuthMiddlewares.isUser, AbsenController.createAbsen);
    this.router.get("/jadwals/:id", AuthMiddlewares.authentication, AuthMiddlewares.isUser, JadwalControllers.getJadwals);
  };
}

export default new Routes().router;