import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateEmployeeDto } from './dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private _employeeService: EmployeeService) {}

  @Post()
  createEmployee(@Body() createEmployee: CreateEmployeeDto) {
    return this._employeeService.createEmployee(createEmployee);
  }

  @Get()
  GetAllEmployees() {
    return this._employeeService.getEmployees();
  }
}
