import { Router } from "ultimate-express";
import AuthController from "../app/controllers/AuthController";
import Auth from "../app/middlewares/auth"

const Route = Router();
/**
 * Protected Routes
 * These routes require authentication
 * ------------------------------------------------
 * GET   /home - User dashboard
 * GET   /profile - User profile
 * POST  /change-profile - Update profile
 * POST  /change-password - Change password
 * DELETE /users - Delete users (admin only)
 */
Route.get("/dashboard", Auth, AuthController.homePage);
Route.get("/profile", Auth, AuthController.profilePage);
Route.post("/change-profile", Auth, AuthController.changeProfile);
Route.post("/change-password", Auth, AuthController.changePassword);
Route.delete("/users", Auth, AuthController.deleteUsers);


export default Route;