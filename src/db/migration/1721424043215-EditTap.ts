import { MigrationInterface, QueryRunner } from "typeorm";

export class EditTap1721424043215 implements MigrationInterface {
    name = 'EditTap1721424043215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tap" ADD "serviceURL" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tap" DROP COLUMN "serviceURL"`);
    }

}
