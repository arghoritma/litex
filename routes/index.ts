import HomeController from "../app/controllers/HomeController";
import AssetController from "../app/controllers/AssetController";
import { Router } from 'ultimate-express';

import AuthRoutes from './authRoutes';
import ProtectedRoutes from './protectedRoutes';
import ApiRoutes from './api'
const Route = Router();


Route.use("/auth", AuthRoutes);
Route.use("/protected", ProtectedRoutes); // Anda bisa menggantinya dengan "dashboard" atau "admin" dll
Route.use("/api", ApiRoutes);

/**
 * Public Routes
 * These routes are accessible without authentication
 * ------------------------------------------------
 * GET  / - Home page
 */
Route.get("/", HomeController.index);

/**
 * Static Asset Handling Routes
 * 
 * 1. Dist Assets (/assets/:file)
 * Serves compiled and bundled assets from the dist/assets directory
 * - Handles JavaScript files (*.js) with proper content type
 * - Handles CSS files (*.css) with proper content type
 * - Implements in-memory caching for better performance
 * - Sets long-term browser cache headers (1 year)
 * Example URLs:
 * - /assets/app.1234abc.js
 * - /assets/main.5678def.css
 */
Route.get("/assets/:file", AssetController.distFolder);

/**
 * 2. CSS Assets (/css/:file)
 * Serves CSS files from the css directory
 */
Route.get("/css/:file", AssetController.cssFolder);

/**
 * 3. JS Assets (/js/:file)
 * Serves JavaScript files from the js directory
 */
Route.get("/js/:file", AssetController.jsFolder);

/**
 * 4. Public Assets (/*) - Catch-all Route
 * Serves static files from the public directory
 * - Must be the LAST route in the file
 * - Only serves files with allowed extensions
 * - Returns 404 for paths without extensions
 * - Implements security checks against unauthorized access
 * 
 * Allowed file types:
 * - Images: .ico, .png, .jpeg, .jpg, .gif, .svg
 * - Documents: .txt, .pdf
 * - Fonts: .woff, .woff2, .ttf, .eot
 * - Media: .mp4, .webm, .mp3, .wav
 * - Web: .css, .js
 * 
 * Example URLs:
 * - /images/logo.png
 * - /documents/terms.pdf
 * - /fonts/roboto.woff2
 */
Route.get("/*", AssetController.publicFolder);

export default Route;