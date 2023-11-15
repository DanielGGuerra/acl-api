import { MigrationInterface, QueryRunner } from 'typeorm';

export class Start1699997457329 implements MigrationInterface {
  name = 'Start1699997457329';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "activated" boolean NOT NULL DEFAULT false, "name" character varying(100) NOT NULL, "login" character varying(100) NOT NULL, "password" character varying(300) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "permissionGroupId" uuid, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_a62473490b3e4578fd683235c5" ON "user" ("login") `,
    );
    await queryRunner.query(
      `CREATE TABLE "permission_group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying(100) NOT NULL, CONSTRAINT "PK_b1372c1e0a14c1b45ab7cce7857" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "permission_policy" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying(100) NOT NULL, "all" boolean NOT NULL DEFAULT false, "read" boolean NOT NULL DEFAULT false, "create" boolean NOT NULL DEFAULT false, "update" boolean NOT NULL DEFAULT false, "delete" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "moduleId" uuid, CONSTRAINT "PK_ff348a710613c760e3515693e4b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "module" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nameController" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0e20d657f968b051e674fbe3117" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "permission_group_permission_policy_permission_policy" ("permissionGroupId" uuid NOT NULL, "permissionPolicyId" uuid NOT NULL, CONSTRAINT "PK_727ec39ae855f04839a46b25c76" PRIMARY KEY ("permissionGroupId", "permissionPolicyId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_81f37e7ba51e0ffab542191991" ON "permission_group_permission_policy_permission_policy" ("permissionGroupId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e93137c0fb05b10ec6bc70a6e9" ON "permission_group_permission_policy_permission_policy" ("permissionPolicyId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_4721288504f6e5c41d258238b94" FOREIGN KEY ("permissionGroupId") REFERENCES "permission_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission_policy" ADD CONSTRAINT "FK_e4c007b19483a5662d3abc8e464" FOREIGN KEY ("moduleId") REFERENCES "module"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission_group_permission_policy_permission_policy" ADD CONSTRAINT "FK_81f37e7ba51e0ffab542191991e" FOREIGN KEY ("permissionGroupId") REFERENCES "permission_group"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission_group_permission_policy_permission_policy" ADD CONSTRAINT "FK_e93137c0fb05b10ec6bc70a6e97" FOREIGN KEY ("permissionPolicyId") REFERENCES "permission_policy"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permission_group_permission_policy_permission_policy" DROP CONSTRAINT "FK_e93137c0fb05b10ec6bc70a6e97"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission_group_permission_policy_permission_policy" DROP CONSTRAINT "FK_81f37e7ba51e0ffab542191991e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission_policy" DROP CONSTRAINT "FK_e4c007b19483a5662d3abc8e464"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_4721288504f6e5c41d258238b94"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e93137c0fb05b10ec6bc70a6e9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_81f37e7ba51e0ffab542191991"`,
    );
    await queryRunner.query(
      `DROP TABLE "permission_group_permission_policy_permission_policy"`,
    );
    await queryRunner.query(`DROP TABLE "module"`);
    await queryRunner.query(`DROP TABLE "permission_policy"`);
    await queryRunner.query(`DROP TABLE "permission_group"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a62473490b3e4578fd683235c5"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
