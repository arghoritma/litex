import { Response, Request } from "../../types";
import { view } from "../services/View";
import ViteManifest from "../services/ViteManifest";

class Controller {

    public async index(request: Request, response: Response) {
        // Get Vite assets for static page
        return response.inertia("home");
    }
}

export default new Controller()
