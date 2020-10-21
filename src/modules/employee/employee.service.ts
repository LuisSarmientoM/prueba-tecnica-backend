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

    const savedEmployeeSalary = await this._employeeSalaryRepository.save(
      savedSalary,
    );

    if (!savedEmployeeSalary) throw new BadRequestException();
    return plainToClass(ReadEmployeeDto, savedEmployee);
  }

  private async saveSalary(
    employeeID: number,
    salario: number,
    position: Position,
  ) {
    const employeSalary: EmployeeSalary = new EmployeeSalary();
    console.log(position);

    employeSalary.employeId = employeeID;
    employeSalary.salario = salario;
    employeSalary.impuestos = salario * position.porcentajeImpuestos;
    employeSalary.salud = salario * position.porcentajeSalud;
    employeSalary.pension = salario * position.porcentajePnsion;
    employeSalary.primas = salario * position.porcentajePrimas;
    employeSalary.positionName = position.name;
    return employeSalary;
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
  async getEmployee(id: number): Promise<any> {
    const employee = await this._employeeSalaryRepository.findOne({
      where: { employeId: id },
    });
    // const total =
    if (!employee) throw new NotFoundException('No se pudo crear al usuario');

    return employee;
  }

  async updateEmployee(
    id: number,
    createEmploye: CreateEmployeeDto,
  ): Promise<ReadEmployeeDto> {
    const {
      addres,
      document,
      name,
      phone,
      positionId,
      salario,
    } = createEmploye;

    const employee = await this._employeeRepository.findOne(id);
    if (!employee) throw new BadRequestException('Not found employee');

    employee.addres = addres;
    employee.document = document;
    employee.name = name;
    employee.phone = phone;
    const position = await this._positionRepository.findOne(positionId);

    const salary = await this.saveSalary(id, salario, position);

    const findSalary = await this._employeeSalaryRepository.findOne({
      where: { employeId: id },
    });
    if (!findSalary) throw new BadRequestException('Not found employee');

    findSalary.employeId = salary.employeId;
    findSalary.salario = salary.salario;
    findSalary.impuestos = salary.impuestos;
    findSalary.salud = salary.salud;
    findSalary.pension = salary.pension;
    findSalary.primas = salary.primas;
    findSalary.positionName = salary.positionName;

    await findSalary.save();
    await employee.save();
    return plainToClass(ReadEmployeeDto, employee);
  }

  async deleteEmployee(id: number) {
    const salary = await this._employeeSalaryRepository.findOne({
      where: {
        employeId: id,
      },
    });
    if (!salary) throw new BadRequestException();
    const sr = await salary.remove();

    if (!sr) throw new BadRequestException();

    const employee = await this._employeeRepository.findOne(id);
    if (!employee) throw new BadRequestException();

    const er = await employee.remove();
    if (!er) throw new BadRequestException();

    return true;
  }
}
