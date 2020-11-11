import ICreateSeriesDTO from '../dtos/ICreateSeriesDTO';
import Series from '../infra/typeorm/entities/Series';

export default interface ISeriesRepository {
  create(data: ICreateSeriesDTO): Promise<Series>;
  findById(id: string): Promise<Series | undefined>;
  find(): Promise<Series[]>;
}
