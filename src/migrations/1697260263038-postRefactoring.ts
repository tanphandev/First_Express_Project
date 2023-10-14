import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1697260263038 implements MigrationInterface {
  name = "PostRefactoring1697260263038";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE Post ADD COLUMN slug VARCHAR(255)");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE Post DROP COLUMN slug");
  }
}
