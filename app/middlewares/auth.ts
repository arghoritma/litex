import DB from "../services/DB";
import { Request, Response, NextFunction } from "ultimate-express";
import { verifyToken } from "../services/Jwt"

declare global {
    namespace Express {
        interface Request {
            user?: any;
            share?: any;
        }
    }
}

const publicRoutes = ["/", "/auth/login", "/auth/register", "/auth/forgot-password", "/auth/reset-password"];
const privateRoutes = ["/protected"];

const isPublicRoute = (path: string): boolean => {
    // Allow all API routes (has its own auth middleware)
    if (path.startsWith("/api/")) {
        return true;
    }
    
    // Allow all asset files (css, js, images, etc)
    if (path.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|json|webmanifest)$/)) {
        return true;
    }

    // Allow specific public paths
    if (path.startsWith("/css/") || path.startsWith("/js/") || path.startsWith("/assets/") ||
        path.startsWith("/icons/") || path === "/sw.js" || path === "/site.webmanifest") {
        return true;
    }

    return publicRoutes.some(route => {
        if (route.endsWith("/*")) {
            const baseRoute = route.slice(0, -2);
            return path.startsWith(baseRoute);
        }
        return path === route || path.startsWith(route + "/");
    });
};

const isPrivateRoute = (path: string): boolean => {
    return privateRoutes.some(route => {
        if (route.endsWith("/*")) {
            const baseRoute = route.slice(0, -2);
            return path.startsWith(baseRoute);
        }
        return path === route;
    });
};

export default async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const isPublic = isPublicRoute(request.path);
        const token = request.cookies.auth_token;

        // No token - only allow public routes
        if (!token) {
            if (isPublic) {
                return next();
            }
            return response.clearCookie("auth_token").redirect("/auth/login");
        }

        // Verify token
        const payload = verifyToken(token);
        if (!payload) {
            return response.clearCookie("auth_token").redirect("/auth/login");
        }

        // Check session
        const session = await DB.from("sessions")
            .where("id", payload.id)
            .first();

        if (!session) {
            return response.clearCookie("auth_token").redirect("/auth/login");
        }

        // Get user
        const user = await DB.from("users")
            .where("id", session.user_id)
            .select(["id", "name", "email", "phone", "is_admin", "is_verified"])
            .first();

        if (!user) {
            return response.clearCookie("auth_token").redirect("/auth/login");
        }

        request.user = user;
        request.share = { user };

        // Authenticated user accessing auth routes - redirect to protected
        if (request.path.startsWith("/auth/")) {
            return response.redirect("/protected");
        }

        // Allow access to protected routes
        next();
    } catch (error) {
        next(error);
    }
};
