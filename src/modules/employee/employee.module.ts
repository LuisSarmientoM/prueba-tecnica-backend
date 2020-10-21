import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionRepository } from '../position/position.repositoty';
import { EmployeeController } from './employee.controller';
import { EmployeeRepository } from './employee.repository';
import { EmployeeSalaryRepository } from './employee.salary.repository';
import { EmployeeService } from './employee.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  imports: [
    TypeOrmModule.forFeature([
      EmployeeRepository,
      PositionRepository,
      EmployeeSalaryRepository,
    ]),
  ],
})
export class EmployeeModule {}
