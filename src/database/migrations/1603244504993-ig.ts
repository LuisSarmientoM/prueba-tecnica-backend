import { MigrationInterface, QueryRunner } from 'typeorm';

export class ig1603244504993 implements MigrationInterface {
  name = 'ig1603244504993';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `position` CHANGE `porcentajeImpuestos` `porcentajeImpuestos` decimal(4,2)',
    );
    await queryRunner.query(
      'ALTER TABLE `position` CHANGE `porcentajeSalud` `porcentajeSalud` decimal(4,2)',
    );
    await queryRunner.query(
      'ALTER TABLE `position` CHANGE `porcentajePnsion` `porcentajePnsion` decimal(4,2)',
    );
    await queryRunner.query(
      'ALTER TABLE `position` CHANGE `porcentajePrimas` `porcentajePrimas` decimal(4,2)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `position` CHANGE `porcentajePrimas` `porcentajePrimas` decimal(4,2) NOT NULL DEFAULT '0.00'",
    );
    await queryRunner.query(
      "ALTER TABLE `position` CHANGE `porcentajePnsion` `porcentajePnsion` decimal(4,2) NOT NULL DEFAULT '0.00'",
    );
    await queryRunner.query(
      "ALTER TABLE `position` CHANGE `porcentajeSalud` `porcentajeSalud` decimal(4,2) NOT NULL DEFAULT '0.00'",
    );
    await queryRunner.query(
      "ALTER TABLE `position` CHANGE `porcentajeImpuestos` `porcentajeImpuestos` decimal(4,2) NOT NULL DEFAULT '0.00'",
    );
  }
}
