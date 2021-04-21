import {MigrationInterface, QueryRunner} from "typeorm";

export class ProfilesAlterationColumnNameMigration1618966710393 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE inf_entity_profiles RENAME COLUMN id TO id_profile");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE inf_entity_profiles RENAME COLUMN id_profile TO id");
    }

}
