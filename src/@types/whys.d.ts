/* eslint-disable @typescript-eslint/naming-convention */

declare namespace WhyTypes {
  export interface MoviesAndSeries {
    id: string;
    name: string;
    year: number;
    genres: Array<string>;
    imdbRating: number;
    restriction: 'L' | '10' | '12' | '14' | '16' | '18';
    synopsis: string;
    image: string;
    allStarsGiven: number;
    stars: number;
    availableIn: string;
  }

  export interface Musics {
    id: string;
    name: string;
    year: number;
    genres: Array<string>;
    artist: string;
    image: string;
    allStarsGiven: number;
    stars: number;
    availableIn: string;
  }

  export interface Books {
    id: string;
    name: string;
    year: number;
    genres: Array<string>;
    author: string;
    synopsis: string;
    copiesSold: number;
    image: string;
    allStarsGiven: number;
    stars: number;
    availableIn: string;
  }

  export type AllWhyTypes = MoviesAndSeries | Musics | Books;
}
