import { MigrationInterface, QueryRunner } from "typeorm";

export class EditTap1721466124885 implements MigrationInterface {
    name = 'EditTap1721466124885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tap" RENAME COLUMN "level" TO "reachedEnergyPerTap"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tap" RENAME COLUMN "reachedEnergyPerTap" TO "level"`);
    }

}
