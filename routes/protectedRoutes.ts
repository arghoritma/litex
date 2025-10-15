import { Router } from "ultimate-express";
import AuthController from "../app/controllers/AuthController";
import Auth from "../app/middlewares/auth"

const Route = Router();

Route.get("/", Auth, AuthController.homePage);
Route.get("/profile", Auth, AuthController.profilePage);
Route.post("/change-profile", Auth, AuthController.changeProfile);
Route.post("/change-password", Auth, AuthController.changePassword);
Route.delete("/users", Auth, AuthController.deleteUsers);



export default Route;