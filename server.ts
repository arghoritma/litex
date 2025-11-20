import inertia from "./app/middleware/inertia";
import authMiddleware from "./app/middleware/auth";
import Routes from "./routes";
import express from "ultimate-express";
import cors from 'cors';
import cookieParser from 'cookie-parser';

require("dotenv").config();

import "./app/services/View";

const server = express();

server.use(cors());
server.use(cookieParser()); // Add cookie parser middleware
server.use(express.json()); // Add JSON body parser middleware
server.use(express.urlencoded({ extended: true })); // Add URL-encoded body parser middleware

// Serve static files from public folder
server.use(express.static('public'));
server.use(authMiddleware); // Add auth middleware
server.use(inertia());
server.use(Routes);

const PORT = parseInt(process.env.PORT) || 5555;

// Error handler untuk ultimate-express
server.use((err: any, req: any, res: any, next: any) => {
   console.log(err);

   if (err.code == "SQLITE_ERROR") {
      res.status(500);
   }

   res.json(err);
});

server.listen(PORT, () => {
   console.log(`🚀 LiteX  Server running at http://localhost:${PORT}`);
   console.log(`⚡ Environment: ${process.env.NODE_ENV || 'development'}`);
   console.log(`🌟 Ready to serve requests!`);

});

process.on("SIGTERM", () => {
   console.info("SIGTERM signal received.");
   process.exit(0);
});
