import { MigrationInterface, QueryRunner } from "typeorm";

export class ArticleRefactoring1697254462051 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE Article ADD COLUMN slug VARCHAR(255)");
    await queryRunner.query(
      "ALTER TABLE Article RENAME COLUMN body TO content"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE Article DROP COLUMN slug");
    await queryRunner.query(
      "ALTER TABLE Article RENAME COLUMN content TO body"
    );
  }
}
