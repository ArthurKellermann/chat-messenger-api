import { Router } from 'express';
import UserController from '../controllers/UserController';
import checkAuth from '../middlewares/checkAuth';
import checkFormData from '../middlewares/checkFormData';

const { authUserByToken, authUserByParams } = checkAuth;
const { storeUser, getUserInfobyId } = UserController;
const routes = Router();

routes.post('/register', checkFormData, storeUser);
//routes.put('/:id', updateUser);
//routes.delete('/:id', deleteUser);
routes.get('/:id', authUserByParams, authUserByToken, getUserInfobyId);

export default routes;
