import { Router } from 'express';
import UserController from '../controllers/UserController';

import checkFormData from '../middlewares/checkFormData';

const { storeUser, updateUser, deleteUser } = UserController;
const routes = Router();

routes.post('/', checkFormData, storeUser);
routes.put('/:id', updateUser);
routes.delete('/:id', deleteUser);

export default routes;
