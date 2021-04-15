import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class WorkschedulesMigration1618450192083 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "inf_entity_workschedules",
			columns: [
				{
					name: 'id_workschedule',
					type: 'integer',
					unsigned: true,
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment',
				},
				{
					name: 'id_owner',
					type: 'integer',
					unsigned: true
				},
				{
					name: "date",
					type: "date"
				},
				{
					name: 'created_at',
					type: 'timestamp',
					default: 'now()'
				},
				{
					name: 'updated_at',
					type: 'timestamp',
					default: 'now()'
				}
			]
		}), true);
		
		
		queryRunner.clearSqlMemory();

		await queryRunner.createForeignKey("inf_entity_workschedules", new TableForeignKey({
				columnNames: ["id_owner"],
				referencedColumnNames: ["id_owner"],
				referencedTableName: "inf_entity_owners",
				onDelete: "CASCADE",
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("inf_entity_workschedules")
	}

}
