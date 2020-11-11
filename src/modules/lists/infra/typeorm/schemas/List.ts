import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

import Why from '@modules/whys/infra/typeorm/entities/Series';

@Entity('lists')
class List {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('uuid')
  userId: string;

  @Column()
  whys: Array<Why>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default List;
