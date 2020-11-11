import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetAllSeriesService from '@modules/whys/services/GetAllSeriesListService';

export default class GetSeriesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const getSeries = container.resolve(GetAllSeriesService);

    const getAllSeries = await getSeries.execute();

    return response.json(classToClass(getAllSeries));
  }
}
