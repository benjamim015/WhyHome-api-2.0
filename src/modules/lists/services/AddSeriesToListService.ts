import { inject, injectable } from 'tsyringe';

import Series from '@modules/whys/infra/typeorm/entities/Series';
import ISeriesRepository from '@modules/whys/repositories/ISeriesRepository';
import AppError from '@shared/errors/AppError';

import IListsRepository from '../repositories/IListsRepository';

interface IRequest {
  userId: string;
  seriesId: string;
}

@injectable()
class AddSeriesToListService {
  constructor(
    @inject('SeriesRepository')
    private seriesRepository: ISeriesRepository,

    @inject('ListsRepository')
    private listsRepository: IListsRepository,
  ) {}

  public async execute({ userId, seriesId }: IRequest): Promise<Series> {
    const series = await this.seriesRepository.findById(seriesId);

    if (!series) {
      throw new AppError('This series does not exist!');
    }

    const list = await this.listsRepository.findById(userId);

    if (!list) {
      throw new AppError('This list does not exist!');
    }

    const findWhy = list.whys.find(why => why.id === seriesId);

    if (findWhy) {
      throw new AppError('This series is already in your adlist');
    }

    list.whys.push(series);

    await this.listsRepository.save(list);

    return series;
  }
}

export default AddSeriesToListService;
