"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ultimate_express_1 = require("ultimate-express");
const ApiController_1 = __importDefault(require("../../app/controllers/api/ApiController"));
const authApi_1 = __importDefault(require("../../app/middlewares/authApi"));
const Route = (0, ultimate_express_1.Router)();
Route.get("/test", ApiController_1.default.index);
Route.get("/protected", authApi_1.default, ApiController_1.default.protected);
exports.default = Route;
//# sourceMappingURL=index.js.map