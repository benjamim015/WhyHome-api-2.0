import { Router } from 'express';

import GetSeriesController from '../controller/GetSeriesController';
import SeriesController from '../controller/SeriesController';

const seriesRouter = Router();
const seriesController = new SeriesController();
const getSeriesController = new GetSeriesController();

seriesRouter.post('/', seriesController.create);
seriesRouter.get('/:id', seriesController.show);
seriesRouter.get('/', getSeriesController.show);

export default seriesRouter;
