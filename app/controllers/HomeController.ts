import { Response, Request } from "../../types";
import { view } from "../services/View";
import ViteManifest from "../services/ViteManifest";

class Controller {

    public async index(request: Request, response: Response) {
        // Get Vite assets for static page
        const assets = ViteManifest.getAssets("js/main.js");

        return response.type("html").send(view("index.html", {
            cssFiles: assets.css,
            jsFiles: assets.js,
        }));
    }
}

export default new Controller()
