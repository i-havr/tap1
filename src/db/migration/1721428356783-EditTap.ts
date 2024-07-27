import { MigrationInterface, QueryRunner } from "typeorm";

export class EditTap1721428356783 implements MigrationInterface {
    name = 'EditTap1721428356783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "tap" ADD "token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tap" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "token" character varying`);
    }

}
