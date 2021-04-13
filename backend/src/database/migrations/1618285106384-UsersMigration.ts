import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

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
                    name: 'id_owner',
                    type: 'integer',
                    unsigned: true
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

        await queryRunner.createForeignKey("inf_entity_users", new TableForeignKey({
            columnNames: ["id_owner"],
            referencedColumnNames: ["id_owner"],
            referencedTableName: "inf_entity_owners",
            onDelete: "CASCADE",
        }));
    }

    
public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("inf_entity_users");
}

}
