
import { Response, Request } from "../../../types";

class Controller {

  public async index(request: Request, response: Response) {
    return response.json({
      message: "API is working",
      timestamp: new Date().toISOString(),
      endpoints: {
        public: [
          "GET /api/test - This endpoint"
        ],
        protected: [
          "GET /api/protected - Requires JWT token or API key"
        ]
      }
    });
  }

  public async protected(request: Request, response: Response) {
    return response.json({
      message: "You have accessed a protected route api",
      user: request.user,
      authMethod: request.share?.authMethod,
      timestamp: new Date().toISOString()
    });
  }

}

export default new Controller()
