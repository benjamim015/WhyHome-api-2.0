import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddSeriesToListService from '@modules/lists/services/AddSeriesToListService';
import RemoveSeriesFromListService from '@modules/lists/services/RemoveSeriesFromListService';
import ShowMyListService from '@modules/lists/services/ShowMyListService';

export default class SeriesListController {
  public async index(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { id } = request.params;

    const addSeriesToList = container.resolve(AddSeriesToListService);

    const series = await addSeriesToList.execute({ userId, seriesId: id });

    return response.json(series);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { id } = request.params;

    const removeFromList = container.resolve(RemoveSeriesFromListService);

    const whyResponse = await removeFromList.execute({
      userId,
      seriesId: id,
    });

    return response.json(whyResponse);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const showMyList = container.resolve(ShowMyListService);

    const myList = await showMyList.execute({ userId });

    return response.json(myList);
  }
}
