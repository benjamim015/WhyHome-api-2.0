import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSeries1603744519792 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'series',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'year',
            type: 'numeric',
          },
          {
            name: 'genres',
            type: 'varchar',
            isArray: true,
          },
          {
            name: 'restriction',
            type: 'varchar',
          },
          {
            name: 'synopsis',
            type: 'varchar',
          },
          {
            name: 'image',
            type: 'varchar',
          },
          {
            name: 'imdbRating',
            type: 'numeric',
          },
          {
            name: 'stars',
            type: 'numeric',
            default: 0,
          },
          {
            name: 'allStarsGiven',
            type: 'numeric',
            default: 0,
          },
          {
            name: 'availableIn',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('series');
  }
}
