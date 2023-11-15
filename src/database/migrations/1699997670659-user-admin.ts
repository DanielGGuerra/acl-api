import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAdmin1699997670659 implements MigrationInterface {
  name = 'UserAdmin1699997670659';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isAdmin" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdmin"`);
  }
}
