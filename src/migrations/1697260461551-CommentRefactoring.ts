import { MigrationInterface, QueryRunner } from "typeorm";

export class CommentRefactoring1697260461551 implements MigrationInterface {
  name = "CommentRefactoring1697260461551";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE Comment ADD COLUMN slug VARCHAR(255)");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE Comment DROP COLUMN slug");
  }
}
