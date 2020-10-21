import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePositionDto } from './dto';
import { PositionService } from './position.service';

@Controller('position')
export class PositionController {
  constructor(private _employeeService: PositionService) {}

  @Post()
  createPosition(@Body() createPosition: CreatePositionDto) {
    console.log(createPosition);

    return this._employeeService.createPosition(createPosition);
  }

  @Get()
  GetAllEmployees() {
    return this._employeeService.getEmployees();
  }
}
