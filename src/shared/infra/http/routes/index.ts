import { Router } from 'express';

import seriesListRouter from '@modules/lists/infra/http/routes/list.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import seriesRouter from '@modules/whys/infra/http/routes/series.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/seriesList', seriesListRouter);
routes.use('/series', seriesRouter);

export default routes;
