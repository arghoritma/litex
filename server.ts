import inertia from "./app/middleware/inertia";
import authMiddleware from "./app/middleware/auth";
import Web from "./routes";
import express from "ultimate-express";
import cors from 'cors';
import cookieParser from 'cookie-parser';

require("dotenv").config();

// rendering html files
import "./app/services/View";

const webserver = express();

webserver.use(cors());
webserver.use(cookieParser()); // Add cookie parser middleware
webserver.use(express.json()); // Add JSON body parser middleware
webserver.use(express.urlencoded({ extended: true })); // Add URL-encoded body parser middleware

// Serve static files from public folder
webserver.use(express.static('public'));
webserver.use(authMiddleware); // Add auth middleware
webserver.use(inertia());
webserver.use(Web);

const PORT = parseInt(process.env.PORT) || 5555;

// Error handler untuk ultimate-express
webserver.use((err: any, req: any, res: any, next: any) => {
   console.log(err);

   if (err.code == "SQLITE_ERROR") {
      res.status(500);
   }

   res.json(err);
});

webserver.listen(PORT, () => {
   console.log(`🚀 LiteX  Server running at http://localhost:${PORT}`);
   console.log(`⚡ Environment: ${process.env.NODE_ENV || 'development'}`);
   console.log(`🌟 Ready to serve requests!`);

});

process.on("SIGTERM", () => {
   console.info("SIGTERM signal received.");
   process.exit(0);
});
