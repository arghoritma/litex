"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    async index(request, response) {
        return response.json({ message: "API is working" });
    }
    async protected(request, response) {
        return response.json({ message: "You have accessed a protected route api", user: request.user });
    }
}
exports.default = new Controller();
//# sourceMappingURL=ApiController.js.map