import { Router } from "ultimate-express";
import AuthApiController from "../../app/controllers/api/AuthApiController";
import authApi from "../../app/middleware/auth-api";

const Route = Router();

Route.post("/register", AuthApiController.register)
Route.post("/login", AuthApiController.login)
Route.post("/logout", authApi, AuthApiController.logout)
Route.post("/refresh-token", authApi, AuthApiController.refreshToken)
Route.get("/profile", authApi, AuthApiController.getProfile)
Route.put("/profile", authApi, AuthApiController.updateProfile)

export default Route;