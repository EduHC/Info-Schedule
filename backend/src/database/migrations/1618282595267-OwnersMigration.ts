import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class OwnersMigration1618282595267 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "inf_entity_owners",
      columns: [
        {
          name: 'id_owner',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '200'
        },
        {
          name: 'company_name',
          type: 'varchar',
          length: '300'
        },
        {
          name: 'CNPJ',
          type: 'varchar',
          length: '300'
        },
        {
          name: 'phone',
          type: 'varchar',
          length: '25'
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
    await queryRunner.dropTable("inf_entity_owners")
  }

}
