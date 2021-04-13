	import {MigrationInterface, QueryRunner, Table} from "typeorm";

	export class UsersMigration1618096342145 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.createTable(new Table({
				name: "inf_entity_users",
				columns: [
					{
						name: 'id_user',
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
					{
						name: 'login',
						type: 'varchar',
						length: "100"
					},
					{
						name: 'password',
						type: 'varchar',
						length: "100"
					},
					{
						name: 'email',
						type: 'varchar',
						length: "150"
					},
					{
						name: 'phone',
						type: 'varchar',
						length: "18"
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
		}

		
	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("inf_entity_users");
	}

	}
