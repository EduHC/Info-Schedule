import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class ProfileMigration1617543390495 implements MigrationInterface {

  // Método executado quando é lida a migration
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
        name: "inf_entity_profiles",
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: "200"
          },
        ]
      }), true);
  }

  // Método executado quando é dado um rollback na migration
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("inf_entity_profiles");
  }
}