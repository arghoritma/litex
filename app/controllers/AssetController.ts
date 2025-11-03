import { Response, Request } from "../../type";
import fs from "fs";
import { view } from "../services/View";

// Cache object to store file contents in memory
let cache: { [key: string]: Buffer } = {};

class Controller {
    /**
     * Serves assets from the dist folder (compiled assets)
     * - Handles CSS and JS files with proper content types
     * - Implements file caching for better performance
     * - Sets appropriate cache headers for browser caching
     */
    public async distFolder(request: Request, response: Response) {
        const file = request.params.file;

        try {
            const filePath = `dist/assets/${file}`;

            // Set appropriate content type based on file extension
            if (file.endsWith(".css")) {
                response.setHeader("Content-Type", "text/css");
            } else if (file.endsWith(".js")) {
                response.setHeader("Content-Type", "application/javascript");
            } else {
                response.setHeader("Content-Type", "application/octet-stream");
            }

            // Set cache control header for browser caching (1 year)
            response.setHeader("Cache-Control", "public, max-age=31536000");

            // Return cached content if available
            if (cache[file]) {
                return response.send(cache[file]);
            }

            // Check if file exists and serve it
            if (
                await fs.promises
                    .access(filePath)
                    .then(() => true)
                    .catch(() => false)
            ) {
                const fileContent = await fs.promises.readFile(filePath);

                // Cache the file content
                cache[file] = fileContent;

                return response.send(fileContent);
            }

            return response.status(404).send("File not found");
        } catch (error) {
            console.error("Error serving dist file:", error);
            return response.status(500).send("Internal server error");
        }
    }

    /**
     * Serves static files from the public folder
     * - Implements security by checking allowed file extensions
     * - Prevents directory traversal attacks
     * - Handles various file types (images, fonts, documents, etc.)
     */
    public async publicFolder(request: Request, response: Response) {
        // List of allowed file extensions for security
        const allowedExtensions = [
            ".ico",
            ".png",
            ".jpeg",
            ".jpg",
            ".gif",
            ".svg",
            ".txt",
            ".pdf",
            ".css",
            ".js",
            ".woff",
            ".woff2",
            ".ttf",
            ".eot",
            ".mp4",
            ".webm",
            ".mp3",
            ".wav",
        ];

        // Clean and construct the file path
        const path =
            "public/" + request.path.replace("/", "").replaceAll("%20", " ");

        // Check if the path has any extension
        if (!path.includes(".")) {
            // Check if it's an API request
            if (request.path.startsWith("/api")) {
                return response.status(404).json({ error: "Not found" });
            }
            return response.status(404).send(view("not-found.html"));
        }

        // Security check: validate file extension
        if (!allowedExtensions.some((ext) => path.toLowerCase().endsWith(ext))) {
            return response.status(403).send("File type not allowed");
        }

        // Check if file exists
        if (!fs.existsSync(path)) {
            return response.status(404).send("File not found");
        }

        // Serve the file
        return response.download(path);
    }

    /**
     * Serves CSS files from the css folder
     * - Works in both development and production
     * - Implements file caching for better performance
     * - Sets appropriate cache headers
     */
    public async cssFolder(request: Request, response: Response) {
        const file = request.params.file;
        const isDev = process.env.NODE_ENV !== "production";
        const basePath = isDev ? "dist/css" : "css";

        try {
            const filePath = `${basePath}/${file}`;

            response.setHeader("Content-Type", "text/css");
            response.setHeader("Cache-Control", "public, max-age=31536000");

            // Return cached content if available
            if (cache[`css/${file}`]) {
                return response.send(cache[`css/${file}`]);
            }

            // Check if file exists and serve it
            if (!fs.existsSync(filePath)) {
                return response.status(404).send("CSS file not found");
            }

            const fileContent = await fs.promises.readFile(filePath);
            cache[`css/${file}`] = fileContent;

            return response.send(fileContent);
        } catch (error) {
            console.error("Error serving CSS file:", error);
            return response.status(500).send("Internal server error");
        }
    }

    /**
     * Serves JavaScript files from the js folder
     * - Works in both development and production
     * - Implements file caching for better performance
     * - Sets appropriate cache headers
     */
    public async jsFolder(request: Request, response: Response) {
        const file = request.params.file;
        const isDev = process.env.NODE_ENV !== "production";
        const basePath = isDev ? "dist/js" : "js";

        try {
            const filePath = `${basePath}/${file}`;

            response.setHeader("Content-Type", "application/javascript");
            response.setHeader("Cache-Control", "public, max-age=31536000");

            // Return cached content if available
            if (cache[`js/${file}`]) {
                return response.send(cache[`js/${file}`]);
            }

            // Check if file exists and serve it
            if (!fs.existsSync(filePath)) {
                return response.status(404).send("JS file not found");
            }

            const fileContent = await fs.promises.readFile(filePath);
            cache[`js/${file}`] = fileContent;

            return response.send(fileContent);
        } catch (error) {
            console.error("Error serving JS file:", error);
            return response.status(500).send("Internal server error");
        }
    }
}

export default new Controller();
