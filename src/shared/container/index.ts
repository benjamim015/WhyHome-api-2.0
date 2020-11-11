import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import ListsRepository from '@modules/lists/infra/typeorm/repositories/ListsRepository';
import IListsRepository from '@modules/lists/repositories/IListsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import SeriesRepository from '@modules/whys/infra/typeorm/repositories/SeriesRepository';
import ISeriesRepository from '@modules/whys/repositories/ISeriesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IListsRepository>(
  'ListsRepository',
  ListsRepository,
);

container.registerSingleton<ISeriesRepository>(
  'SeriesRepository',
  SeriesRepository,
);
