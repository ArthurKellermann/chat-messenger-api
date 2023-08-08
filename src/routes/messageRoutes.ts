import { Router } from 'express';
import MessageController from '../controllers/MessageController';
import checkAuth from '../middlewares/checkAuth';

const { authUserByToken, authUserByParams } = checkAuth;

const { sendMessage, getAllMessages, getMessagesByUserId } = MessageController;
const routes = Router();

routes.post('/:id', authUserByParams, authUserByToken, sendMessage);
routes.get('/', authUserByToken, getAllMessages);
routes.get('/:id', authUserByParams, authUserByToken, getMessagesByUserId);

export default routes;
