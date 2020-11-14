import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertAccounts1598656700306 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO account(number, balance, is_locked, customer_id, created_at, updated_at)
            VALUES
            ('0000000001', 0, 0, 1, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
            ('0000000002', 0, 0, 1, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
            ('0000000003', 0, 0, 2, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
            ('0000000004', 0, 0, 3, UTC_TIMESTAMP(), UTC_TIMESTAMP());
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
