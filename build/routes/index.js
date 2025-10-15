"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HomeController_1 = __importDefault(require("../app/controllers/HomeController"));
const AssetController_1 = __importDefault(require("../app/controllers/AssetController"));
const ultimate_express_1 = require("ultimate-express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const protectedRoutes_1 = __importDefault(require("./protectedRoutes"));
const api_1 = __importDefault(require("./api"));
const Route = (0, ultimate_express_1.Router)();
Route.use("/auth", authRoutes_1.default);
Route.use("/protected", protectedRoutes_1.default);
Route.use("/api", api_1.default);
Route.get("/", HomeController_1.default.index);
Route.get("/assets/:file", AssetController_1.default.distFolder);
Route.get("/*", AssetController_1.default.publicFolder);
exports.default = Route;
//# sourceMappingURL=index.js.map