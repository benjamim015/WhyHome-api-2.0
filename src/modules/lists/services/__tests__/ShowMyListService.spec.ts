import FakeListsRepository from '@modules/lists/repositories/fakes/FakeListsRepository';
import FakeSeriesRepository from '@modules/whys/repositories/fakes/FakeSeriesRepository';
import AppError from '@shared/errors/AppError';

import ShowMyListService from '../ShowMyListService';

let fakeListsRepository: FakeListsRepository;
let showMyList: ShowMyListService;
let fakeSeriesRepository: FakeSeriesRepository;

describe('ShowMyList', () => {
  beforeEach(() => {
    fakeSeriesRepository = new FakeSeriesRepository();
    fakeListsRepository = new FakeListsRepository();
    showMyList = new ShowMyListService(
      fakeSeriesRepository,
      fakeListsRepository,
    );
  });

  it('should be able to show a user list', async () => {
    const serie = await fakeSeriesRepository.create({
      name: 'test-name',
      year: 2010,
      genres: ['gen1', 'gen2'],
      image: 'test-image.png',
      synopsis: 'test-synopsis',
      imdbRating: 8,
      restriction: '10',
      availableIn: 'test-available-in',
    });

    const list = await fakeListsRepository.create({ userId: 'test-id' });

    list.whys.push(serie);

    const myList = await showMyList.execute({ userId: 'test-id' });

    expect(myList).toBeInstanceOf(Array);
  });

  it('should not be able to show a list that does not exist', async () => {
    await expect(
      showMyList.execute({
        userId: 'test-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
