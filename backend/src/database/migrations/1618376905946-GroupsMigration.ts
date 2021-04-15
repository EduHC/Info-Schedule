import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class GroupsMigration1618376905946 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.createTable(new Table({
					name:  "inf_entity_groups",
					columns: [
						{
							name: 'id_group',
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
							name: 'name',
							type: 'varchar',
							length: '100'
						},
						{
							name: 'start_hour',
							type: 'time'
						},
						{
							name: 'end_hour',
							type: 'time'
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

			await queryRunner.createForeignKey("inf_entity_groups", new TableForeignKey({
					columnNames: ["id_owner"],
					referencedColumnNames: ["id_owner"],
					referencedTableName: "inf_entity_owners",
					onDelete: "CASCADE",
			}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("inf_entity_groups");
	}
}
