import { MigrationInterface, QueryRunner } from "typeorm";

export class EditTap1721423671266 implements MigrationInterface {
    name = 'EditTap1721423671266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tap" ADD "level" integer`);
        await queryRunner.query(`ALTER TABLE "tap" ADD "maxEnergy" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tap" DROP COLUMN "maxEnergy"`);
        await queryRunner.query(`ALTER TABLE "tap" DROP COLUMN "level"`);
    }

}
