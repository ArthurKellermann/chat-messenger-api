import { Router } from 'express';
import UserController from '../controllers/UserController';

const { storeUser, updateUser, deleteUser } = UserController;
const routes = Router();

routes.post('/', storeUser);
routes.put('/', updateUser);
routes.delete('/', deleteUser);

export default routes;
