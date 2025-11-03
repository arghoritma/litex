
import { Response, Request } from "../../../type";

class Controller {

  public async index(request: Request, response: Response) {
    return response.json({ message: "API is working" });
  }

  public async protected(request: Request, response: Response) {
    return response.json({ message: "You have accessed a protected route api", user: request.user });
  }

}

export default new Controller()
