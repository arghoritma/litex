"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ultimate_express_1 = require("ultimate-express");
const AuthController_1 = __importDefault(require("../app/controllers/AuthController"));
const auth_1 = __importDefault(require("../app/middlewares/auth"));
const Route = (0, ultimate_express_1.Router)();
Route.get("/", auth_1.default, AuthController_1.default.homePage);
Route.get("/profile", auth_1.default, AuthController_1.default.profilePage);
Route.post("/change-profile", auth_1.default, AuthController_1.default.changeProfile);
Route.post("/change-password", auth_1.default, AuthController_1.default.changePassword);
Route.delete("/users", auth_1.default, AuthController_1.default.deleteUsers);
exports.default = Route;
//# sourceMappingURL=protectedRoutes.js.map