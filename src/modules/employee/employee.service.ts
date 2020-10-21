import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { getConnection } from 'typeorm';
import { Position } from '../position/position.entity';
import { PositionRepository } from '../position/position.repositoty';
import { CreateEmployeeDto, ReadEmployeeDto } from './dto';
import { Employee } from './employee.entity';

import { EmployeeRepository } from './employee.repository';
import { EmployeeSalary } from './employee.salary.entity';
import { EmployeeSalaryRepository } from './employee.salary.repository';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private readonly _employeeRepository: EmployeeRepository,

    @InjectRepository(PositionRepository)
    private readonly _positionRepository: PositionRepository,

    @InjectRepository(EmployeeSalaryRepository)
    private readonly _employeeSalaryRepository: EmployeeSalaryRepository,
  ) {}

  async createEmployee(
    createEmploye: CreateEmployeeDto,
  ): Promise<ReadEmployeeDto> {
    const {
      name,
      document,
      phone,
      addres,
      positionId,
      salario,
    } = createEmploye;
    const newEmployee: Employee = new Employee();

    const position = await this._positionRepository.findOne(positionId);

    newEmployee.name = name;
    newEmployee.document = document;
    newEmployee.phone = phone;
    newEmployee.addres = addres;

    const savedEmployee = await this._employeeRepository.save(newEmployee);
    if (!savedEmployee)
      throw new NotFoundException('No se pudo crear al usuario');

    const savedSalary = await this.saveSalary(
      savedEmployee.id,
      salario,
      position,
    );

    if (!savedSalary) {
      savedEmployee.remove();
    }
    return plainToClass(ReadEmployeeDto, savedEmployee);
  }

  private async saveSalary(
    employeeID: number,
    salario: number,
    position: Position,
  ) {
    const employeSalary: EmployeeSalary = new EmployeeSalary();

    employeSalary.employeId = employeeID;
    employeSalary.salario = salario;
    employeSalary.impuestos = salario * position.porcentajeImpuestos;
    employeSalary.salud = salario * position.porcentajeSalud;
    employeSalary.pension = salario * position.porcentajePnsion;
    employeSalary.primas = salario * position.porcentajePrimas;
    employeSalary.positionName = position.name;

    const savedEmployeeSalary = await this._employeeSalaryRepository.save(
      employeSalary,
    );
    if (savedEmployeeSalary) return false;

    return true;
  }

  async getEmployees(): Promise<{
    employees: ReadEmployeeDto[];
    count: number;
  }> {
    const employees = await this._employeeRepository.findAndCount();
    // const total =
    if (!employees) throw new NotFoundException('No se pudo crear al usuario');

    return {
      employees: plainToClass(ReadEmployeeDto, employees[0]),
      count: employees[1],
    };
  }
}
