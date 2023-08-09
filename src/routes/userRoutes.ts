import { Router } from 'express';
import UserController from '../controllers/UserController';
import checkAuth from '../middlewares/checkAuth';
import checkFormData from '../middlewares/checkFormData';
import upload from '../config/multerConfig';

const { authUserByToken, authUserByParams } = checkAuth;
const { storeUser, getUserInfobyId, getLastMessagesFromEachUser } = UserController;
const routes = Router();

routes.post('/register', upload.single('userImage'), checkFormData, storeUser);
routes.get('/:id', authUserByParams, authUserByToken, getUserInfobyId);
routes.get('/', authUserByToken, getLastMessagesFromEachUser);

export default routes;
