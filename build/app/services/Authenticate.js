"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = __importDefault(require("./DB"));
const crypto_1 = require("crypto");
const Jwt_1 = require("../services/Jwt");
const ITERATIONS = 100000;
const KEYLEN = 64;
const DIGEST = "sha512";
const SALT_SIZE = 16;
class Autenticate {
    async hash(password) {
        const salt = (0, crypto_1.randomBytes)(SALT_SIZE).toString("hex");
        const hash = (0, crypto_1.pbkdf2Sync)(password, salt, ITERATIONS, KEYLEN, DIGEST).toString("hex");
        return `${salt}:${hash}`;
    }
    async compare(password, storedHash) {
        const [salt, hash] = storedHash.split(":");
        const newHash = (0, crypto_1.pbkdf2Sync)(password, salt, ITERATIONS, KEYLEN, DIGEST).toString("hex");
        return hash === newHash;
    }
    async process(user, request, response) {
        const token = (0, crypto_1.randomUUID)();
        await DB_1.default.table("sessions").insert({
            id: token,
            user_id: user.id,
            user_agent: request.headers["user-agent"],
        });
        const jwtToken = (0, Jwt_1.signToken)({ id: token });
        response
            .cookie("auth_token", jwtToken, { maxAge: 1000 * 60 * 60 * 24 * 60 })
            .redirect("/protected");
    }
    async logout(request, response) {
        await DB_1.default.from("sessions").where("id", request.cookies.auth_token).delete();
        response.cookie("auth_token", "", { maxAge: 0 }).redirect("/auth/login");
    }
}
exports.default = new Autenticate();
//# sourceMappingURL=Authenticate.js.map