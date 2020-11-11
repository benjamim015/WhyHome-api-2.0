import { getRepository, Repository } from 'typeorm';

import ICreateSeriesDTO from '@modules/whys/dtos/ICreateSeriesDTO';
import ISeriesRepository from '@modules/whys/repositories/ISeriesRepository';

import Series from '../entities/Series';

class SeriesRepository implements ISeriesRepository {
  private ormRepository: Repository<Series>;

  constructor() {
    this.ormRepository = getRepository(Series);
  }

  public async create(data: ICreateSeriesDTO): Promise<Series> {
    const series = this.ormRepository.create(data);

    await this.ormRepository.save(series);

    return series;
  }

  public async findById(id: string): Promise<Series | undefined> {
    const series = await this.ormRepository.findOne(id);

    return series;
  }

  public async find(): Promise<Series[]> {
    const series = await this.ormRepository.find();

    return series;
  }
}

export default SeriesRepository;
