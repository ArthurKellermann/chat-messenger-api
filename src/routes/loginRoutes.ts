import { Router } from 'express';
import LoginController from '../controllers/LoginController';

import checkFormData from '../middlewares/checkFormData';

const { auth } = LoginController;
const routes = Router();

routes.post('/', checkFormData, auth);

export default routes;
