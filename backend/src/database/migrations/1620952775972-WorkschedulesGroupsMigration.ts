import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class WorkschedulesGroupsMigration1620952775972 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "inf_association_workschedules_groups",
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
                name: "id_group",
                type: "integer",
                unsigned: true,
              },
              {
                name: "id_workschedule",
                type: "integer",
                unsigned: true,
              }
            ],
          }), true);

          await queryRunner.createForeignKey("inf_association_workschedules_groups", new TableForeignKey({
            columnNames: ["id_workschedule"],
            referencedColumnNames: ["id_workschedule"],
            referencedTableName: "inf_entity_workschedules",
            onDelete: "CASCADE",
          }));
      
          await queryRunner.createForeignKey("inf_association_workschedules_groups", new TableForeignKey({
            columnNames: ["id_group"],
            referencedColumnNames: ["id_group"],
            referencedTableName: "inf_entity_groups",
            onDelete: "CASCADE",
          }));
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("inf_association_workschedules_groups");
    }
}
