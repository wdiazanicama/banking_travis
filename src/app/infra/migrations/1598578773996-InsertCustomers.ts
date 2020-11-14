import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertCustomers1598578773996 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO customer(first_name, last_name, is_active, created_at, updated_at) 
            VALUES
            ('Juan', 'Pérez', 1, UTC_TIMESTAMP(),UTC_TIMESTAMP()),
            ('Carlos', 'Pérez', 1, UTC_TIMESTAMP(),UTC_TIMESTAMP()),
            ('Alberto', 'Otero', 1, UTC_TIMESTAMP(),UTC_TIMESTAMP());
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
