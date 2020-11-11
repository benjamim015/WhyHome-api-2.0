import { inject, injectable } from 'tsyringe';

import Series from '@modules/whys/infra/typeorm/entities/Series';

import ISeriesRepository from '../repositories/ISeriesRepository';

interface IRequest {
  name: string;
  year: number;
  synopsis: string;
  genres: Array<string>;
  image: string;
  availableIn: string;
  imdbRating: number;
  restriction: 'L' | '10' | '12' | '14' | '16' | '18';
}

@injectable()
class CreateSeriesService {
  constructor(
    @inject('SeriesRepository')
    private seriesRepository: ISeriesRepository,
  ) {}

  public async execute({ ...serie }: IRequest): Promise<Series> {
    const series = await this.seriesRepository.create({
      ...serie,
    });

    return series;
  }
}

export default CreateSeriesService;
