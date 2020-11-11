import { inject, injectable } from 'tsyringe';

import Series from '@modules/whys/infra/typeorm/entities/Series';
import ISeriesRepository from '@modules/whys/repositories/ISeriesRepository';
import AppError from '@shared/errors/AppError';

import IListsRepository from '../repositories/IListsRepository';

interface IRequest {
  userId: string;
}

@injectable()
class ShowMyListService {
  constructor(
    @inject('SeriesRepository')
    private seriesRepository: ISeriesRepository,

    @inject('ListsRepository')
    private listsRepository: IListsRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<Series[]> {
    const list = await this.listsRepository.findById(userId);

    if (!list) {
      throw new AppError('This list not exist!');
    }

    return list.whys;
  }
}

export default ShowMyListService;
