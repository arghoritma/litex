"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inertia_1 = __importDefault(require("./app/middlewares/inertia"));
const routes_1 = __importDefault(require("./routes"));
const ultimate_express_1 = __importDefault(require("ultimate-express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv").config();
require("./app/services/View");
const webserver = (0, ultimate_express_1.default)();
webserver.use((0, cors_1.default)());
webserver.use((0, cookie_parser_1.default)());
webserver.use(ultimate_express_1.default.json());
webserver.use(ultimate_express_1.default.urlencoded({ extended: true }));
webserver.use(ultimate_express_1.default.static('public'));
webserver.use((0, inertia_1.default)());
webserver.use(routes_1.default);
const PORT = parseInt(process.env.PORT) || 5555;
webserver.use((err, req, res, next) => {
    console.log(err);
    if (err.code == "SQLITE_ERROR") {
        res.status(500);
    }
    res.json(err);
});
webserver.listen(PORT, () => {
    console.log(`🚀 Server and web is running at http://localhost:${PORT}`);
    console.log(`🌟 Ready to serve requests!`);
});
process.on("SIGTERM", () => {
    console.info("SIGTERM signal received.");
    process.exit(0);
});
//# sourceMappingURL=server.js.map