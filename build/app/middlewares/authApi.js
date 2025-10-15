"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = __importDefault(require("../services/DB"));
const Jwt_1 = require("../services/Jwt");
exports.default = async (request, response, next) => {
    try {
        const authToken = request.headers["x-auth-token"];
        if (!authToken) {
            return response.status(401).json({ error: "No token provided" });
        }
        const decoded = (0, Jwt_1.verifyToken)(authToken);
        if (!decoded) {
            return response.status(401).json({ error: "Invalid token" });
        }
        const session = await DB_1.default.from("sessions").where("id", decoded.id).first();
        if (!session) {
            return response.status(401).json({ error: "Invalid session" });
        }
        const user = await DB_1.default.from("users")
            .where("id", session.user_id)
            .select(["id", "name", "email", "phone", "is_admin", "is_verified"])
            .first();
        request.user = user;
        request.share = { user };
        next();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=authApi.js.map