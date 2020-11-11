import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Series from '../infra/typeorm/entities/Series';
import ISeriesRepository from '../repositories/ISeriesRepository';

interface IRequest {
  seriesId: string;
}

@injectable()
class GetSeriesInfoService {
  constructor(
    @inject('SeriesRepository')
    private seriesRepository: ISeriesRepository,
  ) {}

  public async execute({ seriesId }: IRequest): Promise<Series> {
    const serie = await this.seriesRepository.findById(seriesId);

    if (!serie) {
      throw new AppError('This series not exist');
    }

    return serie;
  }
}

export default GetSeriesInfoService;
