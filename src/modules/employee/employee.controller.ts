import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
  @Get(':id')
  GetOneEmployee(@Param('id') id: number) {
    return this._employeeService.getEmployee(id);
  }
  @Put(':id')
  updateEmployee(
    @Body() createEmployee: CreateEmployeeDto,
    @Param('id') id: number,
  ) {
    return this._employeeService.updateEmployee(id, createEmployee);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id: number) {
    return this._employeeService.deleteEmployee(id);
  }
}
