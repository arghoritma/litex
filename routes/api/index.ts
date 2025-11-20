import { Router } from 'ultimate-express';
import ApiController from '../../app/controllers/api/ApiController';
import authApi from '../../app/middleware/auth-api';
import AuthApiRoutes from './auth.api.route';

const Route = Router();

Route.get("/test", ApiController.index);
Route.use("/auth", AuthApiRoutes);
Route.get("/protected", authApi, ApiController.protected);

export default Route;