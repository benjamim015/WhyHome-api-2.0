import List from '@modules/lists/infra/typeorm/schemas/List';

import ICreateListDTO from '../dtos/ICreatelistDTO';

export default interface IListsRepository {
  create(data: ICreateListDTO): Promise<List>;
  save(list: List): Promise<List>;
  findById(id: string): Promise<List | undefined>;
}
