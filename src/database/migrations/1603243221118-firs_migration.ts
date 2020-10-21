import {MigrationInterface, QueryRunner} from "typeorm";

export class firsMigration1603243221118 implements MigrationInterface {
    name = 'firsMigration1603243221118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `employees` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `document` bigint NOT NULL, `phone` varchar(10) NOT NULL, `addres` varchar(50) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `position` DROP COLUMN `porcentajeSalario`");
        await queryRunner.query("ALTER TABLE `employees_salary` ADD CONSTRAINT `FK_74af813e0d4e7110be844ee899f` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `employees_salary` ADD CONSTRAINT `FK_cb37b4b53dd3d1ae0565adc6624` FOREIGN KEY (`position_id`) REFERENCES `position`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `employees_salary` DROP FOREIGN KEY `FK_cb37b4b53dd3d1ae0565adc6624`");
        await queryRunner.query("ALTER TABLE `employees_salary` DROP FOREIGN KEY `FK_74af813e0d4e7110be844ee899f`");
        await queryRunner.query("ALTER TABLE `position` ADD `porcentajeSalario` decimal(4,2) NOT NULL");
        await queryRunner.query("DROP TABLE `employees`");
    }

}
