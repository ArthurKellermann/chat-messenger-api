import { Router } from 'express';
import MessageController from '../controllers/MessageController';
import checkAuth from '../middlewares/checkAuth';

const { authUser } = checkAuth;

const { send } = MessageController;
const routes = Router();

routes.post('/:id', authUser, send);

export default routes;
