import FakeSeriesRepository from '@modules/whys/repositories/fakes/FakeSeriesRepository';
import AppError from '@shared/errors/AppError';

import GetInfoService from '../GetSeriesInfoService';

let fakeSeriesRepository: FakeSeriesRepository;
let getInfo: GetInfoService;

describe('GetSeriesInfo', () => {
  beforeEach(() => {
    fakeSeriesRepository = new FakeSeriesRepository();
    getInfo = new GetInfoService(fakeSeriesRepository);
  });

  it('should be able to show series info', async () => {
    const series = await fakeSeriesRepository.create({
      name: 'Test-series',
      year: 2010,
      genres: ['gen1', 'gen2'],
      imdbRating: 8,
      synopsis: 'Test-synopsis',
      image: 'test-image',
      restriction: '10',
      availableIn: 'test-available-in',
    });

    const seriesInfo = await getInfo.execute({ seriesId: series.id });

    expect(seriesInfo).toHaveProperty('id');
    expect(seriesInfo).toHaveProperty('stars', 0);
    expect(seriesInfo).toHaveProperty('allStarsGiven', 0);
  });

  it('should not be able to show series info from a series that does not exist', async () => {
    await expect(
      getInfo.execute({
        seriesId: 'non-existing-series',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
