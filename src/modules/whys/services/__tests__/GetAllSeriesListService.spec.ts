import FakeSeriesRepository from '@modules/whys/repositories/fakes/FakeSeriesRepository';

import GetAllSeriesListService from '../GetAllSeriesListService';

let fakeSeriesRepository: FakeSeriesRepository;
let getAllSeries: GetAllSeriesListService;

describe('GetAllSeries', () => {
  beforeEach(() => {
    fakeSeriesRepository = new FakeSeriesRepository();
    getAllSeries = new GetAllSeriesListService(fakeSeriesRepository);
  });

  it('should be able to show all series', async () => {
    await fakeSeriesRepository.create({
      name: 'Test-series',
      year: 2010,
      genres: ['gen1', 'gen2'],
      imdbRating: 8,
      synopsis: 'Test-synopsis',
      image: 'test-image',
      restriction: '10',
      availableIn: 'test-available-in',
    });

    const allSeries = await getAllSeries.execute();

    expect(allSeries.length).toBe(1);
  });
});
