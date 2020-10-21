import {MigrationInterface, QueryRunner} from "typeorm";

export class firsMigra1603243891775 implements MigrationInterface {
    name = 'firsMigra1603243891775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `position` CHANGE `porcentajeImpuestos` `porcentajeImpuestos` decimal(4,2) NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `position` CHANGE `porcentajeSalud` `porcentajeSalud` decimal(4,2) NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `position` CHANGE `porcentajePnsion` `porcentajePnsion` decimal(4,2) NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `position` CHANGE `porcentajePrimas` `porcentajePrimas` decimal(4,2) NOT NULL DEFAULT 0");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `position` CHANGE `porcentajePrimas` `porcentajePrimas` decimal(4,2) NOT NULL");
        await queryRunner.query("ALTER TABLE `position` CHANGE `porcentajePnsion` `porcentajePnsion` decimal(4,2) NOT NULL");
        await queryRunner.query("ALTER TABLE `position` CHANGE `porcentajeSalud` `porcentajeSalud` decimal(4,2) NOT NULL");
        await queryRunner.query("ALTER TABLE `position` CHANGE `porcentajeImpuestos` `porcentajeImpuestos` decimal(4,2) NOT NULL");
    }

}
