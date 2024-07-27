import { MigrationInterface, QueryRunner } from "typeorm";

export class EditTap1721423805617 implements MigrationInterface {
    name = 'EditTap1721423805617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tap" ADD "service" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tap" DROP COLUMN "service"`);
    }

}
