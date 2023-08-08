import { Router } from 'express';
import MessageController from '../controllers/MessageController';
import checkAuth from '../middlewares/checkAuth';

const { authUserByToken, authUserByParams } = checkAuth;

const { send, getAllMessages } = MessageController;
const routes = Router();

routes.post('/:id', authUserByParams, authUserByToken, send);
routes.get('/', authUserByToken, getAllMessages);

export default routes;
