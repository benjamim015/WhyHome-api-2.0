import { v4 } from 'uuid';

import ICreateSeriesDTO from '@modules/whys/dtos/ICreateSeriesDTO';
import Series from '@modules/whys/infra/typeorm/entities/Series';
import ISeriesRepository from '@modules/whys/repositories/ISeriesRepository';

class FakeSeriesRepository implements ISeriesRepository {
  private seriesList: Series[] = [];

  public async create(data: ICreateSeriesDTO): Promise<Series> {
    const series = new Series();

    Object.assign(series, { id: v4(), stars: 0, allStarsGiven: 0 }, data);

    this.seriesList.push(series);

    return series;
  }

  public async findById(id: string): Promise<Series | undefined> {
    const series = this.seriesList.find(serie => serie.id === id);

    return series;
  }

  public async find(): Promise<Series[]> {
    return this.seriesList;
  }
}

export default FakeSeriesRepository;
