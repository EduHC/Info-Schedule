import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class GroupsUsersMigration1620343525673 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "inf_association_groups_users",
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
          name: "id_group",
          type: "integer",
          unsigned: true,
        }
      ],
    }), true);

    await queryRunner.createForeignKey("inf_association_groups_users", new TableForeignKey({
      columnNames: ["id_user"],
      referencedColumnNames: ["id_user"],
      referencedTableName: "inf_entity_users",
      onDelete: "CASCADE",
    }));

    await queryRunner.createForeignKey("inf_association_groups_users", new TableForeignKey({
      columnNames: ["id_group"],
      referencedColumnNames: ["id_group"],
      referencedTableName: "inf_entity_groups",
      onDelete: "CASCADE",
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("inf_association_groups_users");
  }
}
