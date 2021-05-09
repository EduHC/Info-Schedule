import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class UsersProfilesMigration1619140093635 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "inf_association_users_profiles",
      columns: [
        {
          name: 'id_association',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: "id_user",
          type: "integer",
          unsigned: true,
        },
        {
          name: "id_profile",
          type: "integer",
          unsigned: true,
        }
      ],
    }), true);

    await queryRunner.createForeignKey("inf_association_users_profiles", new TableForeignKey({
      columnNames: ["id_user"],
      referencedColumnNames: ["id_user"],
      referencedTableName: "inf_entity_users",
      onDelete: "CASCADE",
    }));

    await queryRunner.createForeignKey("inf_association_users_profiles", new TableForeignKey({
      columnNames: ["id_profile"],
      referencedColumnNames: ["id_profile"],
      referencedTableName: "inf_entity_profiles",
      onDelete: "CASCADE",
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("inf_association_users_profiles");
  }

}
