import { Router } from 'express';
import MessageController from '../controllers/MessageController';

const { send } = MessageController;
const routes = Router();

routes.post('/:id', send);

export default routes;
