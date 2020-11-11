import { inject, injectable } from 'tsyringe';

import Series from '../infra/typeorm/entities/Series';
import ISeriesRepository from '../repositories/ISeriesRepository';

@injectable()
class GetAllSeriesListService {
  constructor(
    @inject('SeriesRepository')
    private seriesRepository: ISeriesRepository,
  ) {}

  public async execute(): Promise<Series[]> {
    const series = await this.seriesRepository.find();

    return series;
  }
}

export default GetAllSeriesListService;
