"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = __importDefault(require("../services/DB"));
const Jwt_1 = require("../services/Jwt");
exports.default = async (request, response, next) => {
    try {
        if (request.cookies.auth_token) {
            const payload = (0, Jwt_1.verifyToken)(request.cookies.auth_token);
            console.log("Payload:", payload);
            if (payload) {
                const user = await DB_1.default.from("users")
                    .where("id", payload.id)
                    .select(["id", "name", "email", "phone", "is_admin", "is_verified"])
                    .first();
                request.user = user;
                request.share = {
                    user: request.user,
                };
                next();
            }
            else {
                response.clearCookie("auth_token").redirect("/auth/login");
            }
        }
        else {
            response.clearCookie("auth_token").redirect("/auth/login");
        }
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=auth.js.map