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
class RemoveSeriesToListService {
  constructor(
    @inject('SeriesRepository')
    private seriesRepository: ISeriesRepository,

    @inject('ListsRepository')
    private listsRepository: IListsRepository,
  ) {}

  public async execute({ userId, seriesId }: IRequest): Promise<Series> {
    const series = await this.seriesRepository.findById(seriesId);

    if (!series) {
      throw new AppError('This series does not exits!');
    }

    const list = await this.listsRepository.findById(userId);

    if (!list) {
      throw new AppError('This list does not exits!');
    }

    const findWhyIndex = list.whys.findIndex(why => why.id === seriesId);

    if (findWhyIndex <= -1) {
      throw new AppError('This series is not on your list');
    }

    list.whys.splice(findWhyIndex, 1);

    await this.listsRepository.save(list);

    return series;
  }
}

export default RemoveSeriesToListService;
