"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ultimate_express_1 = require("ultimate-express");
const AuthController_1 = __importDefault(require("../app/controllers/AuthController"));
const Route = (0, ultimate_express_1.Router)();
Route.get("/login", AuthController_1.default.loginPage);
Route.post("/login", AuthController_1.default.processLogin);
Route.get("/register", AuthController_1.default.registerPage);
Route.post("/register", AuthController_1.default.processRegister);
Route.post("/logout", AuthController_1.default.logout);
Route.get("/google/redirect", AuthController_1.default.redirect);
Route.get("/google/callback", AuthController_1.default.googleCallback);
Route.get("/forgot-password", AuthController_1.default.forgotPasswordPage);
Route.post("/forgot-password", AuthController_1.default.sendResetPassword);
Route.get("/reset-password/:id", AuthController_1.default.resetPasswordPage);
Route.post("/reset-password", AuthController_1.default.resetPassword);
exports.default = Route;
//# sourceMappingURL=authRoutes.js.map