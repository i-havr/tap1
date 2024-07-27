import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNextTapTime1721423432895 implements MigrationInterface {
    name = 'AddNextTapTime1721423432895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tap" ADD "nextTapTime" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tap" DROP COLUMN "nextTapTime"`);
    }

}
