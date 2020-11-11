import FakeSeriesRepository from '@modules/whys/repositories/fakes/FakeSeriesRepository';

import CreateSeriesService from '../CreateSeriesService';

let fakeSeriesRepository: FakeSeriesRepository;
let createSeries: CreateSeriesService;

describe('CreateSeries', () => {
  beforeEach(() => {
    fakeSeriesRepository = new FakeSeriesRepository();
    createSeries = new CreateSeriesService(fakeSeriesRepository);
  });

  it("should be able to 'create' a new series", async () => {
    const series = await createSeries.execute({
      name: 'Test-series',
      year: 2010,
      genres: ['gen1', 'gen2'],
      imdbRating: 8,
      synopsis: 'Test-synopsis',
      image: 'test-image',
      restriction: '10',
      availableIn: 'test-available-in',
    });

    expect(series).toHaveProperty('id');
    expect(series).toHaveProperty('stars', 0);
    expect(series).toHaveProperty('allStarsGiven', 0);
  });
});
