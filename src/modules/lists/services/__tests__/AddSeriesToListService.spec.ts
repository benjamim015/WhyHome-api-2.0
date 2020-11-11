import FakeListsRepository from '@modules/lists/repositories/fakes/FakeListsRepository';
import FakeSeriesRepository from '@modules/whys/repositories/fakes/FakeSeriesRepository';
import AppError from '@shared/errors/AppError';

import AddSeriesToListService from '../AddSeriesToListService';

let fakeListsRepository: FakeListsRepository;
let addSeriesToList: AddSeriesToListService;
let fakeSeriesRepository: FakeSeriesRepository;

describe('AddToList', () => {
  beforeEach(() => {
    fakeListsRepository = new FakeListsRepository();
    fakeSeriesRepository = new FakeSeriesRepository();
    addSeriesToList = new AddSeriesToListService(
      fakeSeriesRepository,
      fakeListsRepository,
    );
  });

  it('should be able to add a why to list', async () => {
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

    await addSeriesToList.execute({
      userId: list.userId,
      seriesId: serie.id,
    });

    expect(list).toHaveProperty('whys', [
      {
        id: serie.id,
        name: 'test-name',
        year: 2010,
        genres: ['gen1', 'gen2'],
        image: 'test-image.png',
        synopsis: 'test-synopsis',
        imdbRating: 8,
        restriction: '10',
        availableIn: 'test-available-in',
        stars: 0,
        allStarsGiven: 0,
      },
    ]);
  });

  it('should not be able to add same series in same list', async () => {
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

    await addSeriesToList.execute({
      userId: list.userId,
      seriesId: serie.id,
    });

    await expect(
      addSeriesToList.execute({
        userId: list.userId,
        seriesId: serie.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add a serie that does not exist', async () => {
    const list = await fakeListsRepository.create({ userId: 'test-id' });

    await expect(
      addSeriesToList.execute({
        userId: list.userId,
        seriesId: 'non-existing-series',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add a serie to a list that does not exist', async () => {
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
      addSeriesToList.execute({
        userId: 'non-existing-user',
        seriesId: serie.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
