import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ListController from '../controllers/ListController';

const listRouter = Router();
const listController = new ListController();

listRouter.use(ensureAuthenticated);

listRouter.post('/:id', listController.index);
listRouter.delete('/:id', listController.delete);
listRouter.get('/', listController.show);

export default listRouter;
