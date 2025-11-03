import { Router } from 'ultimate-express';
import ApiController from '../../app/controllers/api/ApiController';
import authApi from '../../app/middlewares/authApi';

const Route = Router();

Route.get("/test", ApiController.index);
Route.get("/protected", authApi, ApiController.protected);

export default Route;