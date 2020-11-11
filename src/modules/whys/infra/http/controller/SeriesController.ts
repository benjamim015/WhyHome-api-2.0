import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSeriesService from '@modules/whys/services/CreateSeriesService';
import ShowSeriesService from '@modules/whys/services/GetSeriesInfoService';

export default class SeriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      year,
      synopsis,
      genres,
      image,
      restriction,
      imdbRating,
      availableIn,
    } = request.body;

    const createSeries = container.resolve(CreateSeriesService);

    const series = await createSeries.execute({
      name,
      year,
      synopsis,
      genres,
      image,
      restriction,
      imdbRating,
      availableIn,
    });

    return response.json(series);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showSeries = container.resolve(ShowSeriesService);

    const showSeriesInfo = await showSeries.execute({ seriesId: id });

    return response.json(classToClass(showSeriesInfo));
  }
}
