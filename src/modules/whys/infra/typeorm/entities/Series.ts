import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('series')
class Series {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column('varchar', { array: true })
  genres: Array<string>;

  @Column()
  restriction: 'L' | '10' | '12' | '14' | '16' | '18';

  @Column()
  synopsis: string;

  @Column()
  image: string;

  @Column()
  imdbRating: number;

  @Column('numeric', { default: 0 })
  stars: number;

  @Column('numeric', { default: 0 })
  allStarsGiven: number;

  @Column()
  availableIn: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'slug' })
  getEncodedUrl(): string {
    return encodeURIComponent(this.name);
  }
}

export default Series;
