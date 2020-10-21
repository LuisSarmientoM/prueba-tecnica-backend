import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CreatePositionDto, ReadPositionDto } from './dto';
import { Position } from './position.entity';
import { PositionRepository } from './position.repositoty';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(PositionRepository)
    private readonly _positionRepository: PositionRepository,
  ) {}

  async createPosition(
    createPosition: CreatePositionDto,
  ): Promise<ReadPositionDto> {
    const {
      name,
      porcentajeImpuestos,
      porcentajeSalud,
      porcentajePnsion,
      porcentajePrimas,
    } = createPosition;

    const newPosition: Position = new Position();

    newPosition.name = name;
    newPosition.porcentajeImpuestos = porcentajeImpuestos;
    newPosition.porcentajeSalud = porcentajeSalud;
    newPosition.porcentajePnsion = porcentajePnsion;
    newPosition.porcentajePrimas = porcentajePrimas;

    const saved = await this._positionRepository.save(newPosition);
    if (!saved) throw new NotFoundException('No se pudo crear el salario');
    return plainToClass(ReadPositionDto, saved);
  }

  async getEmployees(): Promise<{
    positions: ReadPositionDto[];
    count: number;
  }> {
    const employees = await this._positionRepository.findAndCount();
    // const total =
    if (!employees) throw new NotFoundException('No se pudo crear al usuario');

    return {
      positions: plainToClass(ReadPositionDto, employees[0]),
      count: employees[1],
    };
  }
}
