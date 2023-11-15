import { MigrationInterface, QueryRunner } from 'typeorm';

const user = {
  activated: 'true',
  name: 'Usuário Administrador',
  isAdmin: 'true',
  login: 'administrador@admin.com',
  password: '98!Admin',
  permissionGroup: null,
};

export class InsertUserAdmin1700017680187 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO public."user"
    (id, activated, "name", login, "password", "createdAt", "updatedAt", "permissionGroupId", "isAdmin")
    VALUES(uuid_generate_v4(), ${user.activated}, '${user.name}', '${user.login}', '${user.password}', now(), now(), null, ${user.isAdmin});
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `delete from public."user" where login = '${user.login}'`,
    );
  }
}
