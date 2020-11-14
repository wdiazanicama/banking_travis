import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1598578727466 implements MigrationInterface {
  name = 'InitialSchema1598578727466';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `customer` (`customer_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `first_name` varchar(75) NOT NULL, `last_name` varchar(75) NOT NULL, `is_active` tinyint(1) UNSIGNED NOT NULL DEFAULT 1, `created_at` datetime NOT NULL, `updated_at` datetime NOT NULL, PRIMARY KEY (`customer_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `account` (`account_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `number` varchar(10) NOT NULL, `balance` decimal(10,2) NOT NULL, `is_locked` tinyint(1) UNSIGNED NOT NULL DEFAULT 0, `customer_id` bigint UNSIGNED NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NOT NULL, UNIQUE INDEX `IDX_51a4a0db7e5c7bc465ffc8722b` (`number`), PRIMARY KEY (`account_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `transaction` (`transaction_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `type` char(1) NOT NULL, `account_id_from` bigint UNSIGNED NULL, `account_id_to` bigint UNSIGNED NULL, `amount` decimal(10,2) NOT NULL, `status` tinyint(2) UNSIGNED NOT NULL, `created_at` datetime NOT NULL, PRIMARY KEY (`transaction_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `account` ADD CONSTRAINT `FK_977b5abdf1370566eaade16eaa9` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `transaction` ADD CONSTRAINT `FK_104c437ca92d5dce9ffeb968917` FOREIGN KEY (`account_id_from`) REFERENCES `account`(`account_id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `transaction` ADD CONSTRAINT `FK_f9f4ecb2248d77a54a9e6b43c6a` FOREIGN KEY (`account_id_to`) REFERENCES `account`(`account_id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `transaction` DROP FOREIGN KEY `FK_f9f4ecb2248d77a54a9e6b43c6a`',
    );
    await queryRunner.query(
      'ALTER TABLE `transaction` DROP FOREIGN KEY `FK_104c437ca92d5dce9ffeb968917`',
    );
    await queryRunner.query(
      'ALTER TABLE `account` DROP FOREIGN KEY `FK_977b5abdf1370566eaade16eaa9`',
    );
    await queryRunner.query('DROP TABLE `transaction`');
    await queryRunner.query(
      'DROP INDEX `IDX_51a4a0db7e5c7bc465ffc8722b` ON `account`',
    );
    await queryRunner.query('DROP TABLE `account`');
    await queryRunner.query('DROP TABLE `customer`');
  }
}
