import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePositionDto } from './dto';
import { PositionService } from './position.service';

@Controller('position')
export class PositionController {
  constructor(private _positionService: PositionService) {}

  @Post()
  createPosition(@Body() createPosition: CreatePositionDto) {
    console.log(createPosition);

    return this._positionService.createPosition(createPosition);
  }

  @Get()
  GetAllPosition() {
    return this._positionService.getPositions();
  }
  @Get(':id')
  getOnePosition(@Param('id') id: number) {
    return this._positionService.getPosition(id);
  }
  @Put(':id')
  updatePosition(
    @Body() createPosition: CreatePositionDto,
    @Param('id') id: number,
  ) {
    return this._positionService.updatePosition(id, createPosition);
  }

  @Delete(':id')
  deletePosition(@Param('id') id: number) {
    return this._positionService.deletePosition(id);
  }
}
