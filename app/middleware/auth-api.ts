import DB from "../services/DB";
import { Request, Response, NextFunction } from "ultimate-express"; // or from ultimate-express
import { verifyToken } from "../services/Jwt";

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
		const authHeader = request.headers.authorization;
		const authToken = authHeader && authHeader.startsWith('Bearer ')
			? authHeader.substring(7)
			: null;

		if (!authToken) {
			return response.status(401).json({ error: "No token provided" });
		}

		const decoded = verifyToken(authToken);
		if (!decoded) {
			return response.status(401).json({ error: "Invalid token" });
		}

		const session = await DB.from("sessions").where("id", decoded.id).first();

		if (!session) {
			return response.status(401).json({ error: "Invalid session" });
		}

		const user = await DB.from("users")
			.where("id", session.user_id)
			.select(["id", "name", "email", "phone", "is_admin", "is_verified"])
			.first();

		request.user = user;
		request.share = { user };

		next();
	} catch (error) {
		next(error);
	}
};
