import { Repository, EntityRepository } from 'typeorm';
import { Employee } from './employee.entity';
import { EmployeeSalary } from './employee.salary.entity';

@EntityRepository(EmployeeSalary)
export class EmployeeSalaryRepository extends Repository<EmployeeSalary> {}
