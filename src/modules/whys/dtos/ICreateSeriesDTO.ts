export default interface ICreateSeriesDTO {
  name: string;
  year: number;
  genres: Array<string>;
  imdbRating: number;
  restriction: 'L' | '10' | '12' | '14' | '16' | '18';
  synopsis: string;
  image: string;
  availableIn: string;
}
