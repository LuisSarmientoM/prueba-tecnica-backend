import {MigrationInterface, QueryRunner} from "typeorm";

export class ig21603247667604 implements MigrationInterface {
    name = 'ig21603247667604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `employees_salary` DROP FOREIGN KEY `FK_cb37b4b53dd3d1ae0565adc6624`");
        await queryRunner.query("DROP INDEX `REL_cb37b4b53dd3d1ae0565adc662` ON `employees_salary`");
        await queryRunner.query("ALTER TABLE `employees_salary` CHANGE `position_id` `positionName` int NOT NULL");
        await queryRunner.query("ALTER TABLE `employees_salary` DROP COLUMN `positionName`");
        await queryRunner.query("ALTER TABLE `employees_salary` ADD `positionName` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `position` CHANGE `porcentajeImpuestos` `porcentajeImpuestos` decimal(4,2) NOT NULL");
        await queryRunner.query("ALTER TABLE `position` CHANGE `porcentajeSalud` `porcentajeSalud` decimal(4,2) NOT NULL");
        await queryRunner.query("ALTER TABLE `position` CHANGE `porcentajePnsion` `porcentajePnsion` decimal(4,2) NOT NULL");
        await queryRunner.query("ALTER TABLE `position` CHANGE `porcentajePrimas` `porcentajePrimas` decimal(4,2) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `position` CHANGE `porcentajePrimas` `porcentajePrimas` decimal(4,2) NULL");
        await queryRunner.query("ALTER TABLE `position` CHANGE `porcentajePnsion` `porcentajePnsion` decimal(4,2) NULL");
        await queryRunner.query("ALTER TABLE `position` CHANGE `porcentajeSalud` `porcentajeSalud` decimal(4,2) NULL");
        await queryRunner.query("ALTER TABLE `position` CHANGE `porcentajeImpuestos` `porcentajeImpuestos` decimal(4,2) NULL");
        await queryRunner.query("ALTER TABLE `employees_salary` DROP COLUMN `positionName`");
        await queryRunner.query("ALTER TABLE `employees_salary` ADD `positionName` int NOT NULL");
        await queryRunner.query("ALTER TABLE `employees_salary` CHANGE `positionName` `position_id` int NOT NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_cb37b4b53dd3d1ae0565adc662` ON `employees_salary` (`position_id`)");
        await queryRunner.query("ALTER TABLE `employees_salary` ADD CONSTRAINT `FK_cb37b4b53dd3d1ae0565adc6624` FOREIGN KEY (`position_id`) REFERENCES `position`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
