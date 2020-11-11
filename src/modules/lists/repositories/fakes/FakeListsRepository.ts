import { v4 } from 'uuid';

import ICreateListDTO from '@modules/lists/dtos/ICreatelistDTO';
import List from '@modules/lists/infra/typeorm/schemas/List';
import IListsRepository from '@modules/lists/repositories/IListsRepository';

class FakeListsRepository implements IListsRepository {
  private lists: List[] = [];

  public async create(listData: ICreateListDTO): Promise<List> {
    const list = new List();

    Object.assign(list, { userId: v4(), whys: [] }, listData);

    this.lists.push(list);

    return list;
  }

  public async findById(id: string): Promise<List | undefined> {
    const findList = this.lists.find(list => list.userId === id);

    return findList;
  }

  public async save(list: List): Promise<List> {
    const findIndex = this.lists.findIndex(findList => findList.id === list.id);

    this.lists[findIndex] = list;

    return list;
  }
}

export default FakeListsRepository;
