import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateListDTO from '@modules/lists/dtos/ICreatelistDTO';
import List from '@modules/lists/infra/typeorm/schemas/List';
import IListsRepository from '@modules/lists/repositories/IListsRepository';

export default class ListsRepository implements IListsRepository {
  private ormRepository: MongoRepository<List>;

  constructor() {
    this.ormRepository = getMongoRepository(List, 'mongo');
  }

  public async create({ userId }: ICreateListDTO): Promise<List> {
    const list = this.ormRepository.create({
      userId,
      whys: [],
    });

    await this.ormRepository.save(list);

    return list;
  }

  public async findById(id: string): Promise<List | undefined> {
    const list = await this.ormRepository.findOne({
      where: { userId: id },
    });

    return list;
  }

  public async save(list: List): Promise<List> {
    return this.ormRepository.save(list);
  }
}
