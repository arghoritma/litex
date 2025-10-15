import DB from "../services/DB";
import { Request, Response, NextFunction } from "ultimate-express"; // or from ultimate-express
import { verifyToken } from "../services/Jwt"

declare global {
    namespace Express {
        interface Request {
            user?: any;
            share?: any;
        }
    }
}

export default async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        if (request.cookies.auth_token) {
            const payload = verifyToken(request.cookies.auth_token);
            console.log("Payload:", payload);
            if (payload) {

                const session = await DB.from("sessions")
                    .where("id", payload.id)
                    .first();

                if (!session) {
                    response.clearCookie("auth_token").redirect("/auth/login");
                    return;
                }
                const user = await DB.from("users")
                    .where("id", session.user_id)
                    .select(["id", "name", "email", "phone", "is_admin", "is_verified"])
                    .first();

                request.user = user;

                request.share = {
                    user: request.user,
                };

                next(); // Continue to next middleware/route
            } else {
                response.clearCookie("auth_token").redirect("/auth/login");
            }
        } else {
            response.clearCookie("auth_token").redirect("/auth/login");
        }
    } catch (error) {
        next(error); // Pass error to error handler
    }
};
