import FakeListsRepository from '@modules/lists/repositories/fakes/FakeListsRepository';
import FakeSeriesRepository from '@modules/whys/repositories/fakes/FakeSeriesRepository';
import AppError from '@shared/errors/AppError';

import RemoveSeriesFromListService from '../RemoveSeriesFromListService';

let fakeListsRepository: FakeListsRepository;
let removeSeriesFromList: RemoveSeriesFromListService;
let fakeSeriesRepository: FakeSeriesRepository;

describe('AddToList', () => {
  beforeEach(() => {
    fakeListsRepository = new FakeListsRepository();
    fakeSeriesRepository = new FakeSeriesRepository();
    removeSeriesFromList = new RemoveSeriesFromListService(
      fakeSeriesRepository,
      fakeListsRepository,
    );
  });

  it('should be able to remove a why from list', async () => {
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

    await removeSeriesFromList.execute({
      userId: list.userId,
      seriesId: serie.id,
    });

    expect(list).toHaveProperty('whys', []);
  });

  it('should not be able to remove a why that is not in your list', async () => {
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

    await expect(
      removeSeriesFromList.execute({
        userId: list.userId,
        seriesId: serie.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to remove a serie that does not exist', async () => {
    const list = await fakeListsRepository.create({ userId: 'test-id' });

    await expect(
      removeSeriesFromList.execute({
        userId: list.userId,
        seriesId: 'non-existing-series',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to remove a serie to a list that does not exist', async () => {
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

    await expect(
      removeSeriesFromList.execute({
        userId: 'non-existing-user',
        seriesId: serie.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
