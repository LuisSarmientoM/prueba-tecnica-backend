import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async getPosition(id: number): Promise<ReadPositionDto> {
    const employee = await this._positionRepository.findOne(id);
    // const total =
    if (!employee)
      throw new NotFoundException('No se pudo encontrar al usuario');

    return plainToClass(ReadPositionDto, employee);
  }
  async getPositions(): Promise<{
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

  async deletePosition(id: number) {
    const position = await this._positionRepository.findOne(id);
    if (!position) throw new BadRequestException();
    const pr = await position.remove();

    if (!pr) throw new BadRequestException();
    return true;
  }

  async updatePosition(id: number, createPosition: CreatePositionDto) {
    const {
      name,
      porcentajeImpuestos,
      porcentajePnsion,
      porcentajeSalud,
      porcentajePrimas,
    } = createPosition;
    const position = await this._positionRepository.findOne(id);

    if (!position) {
      throw new BadRequestException();
    }

    position.name = name;
    position.porcentajeImpuestos = porcentajeImpuestos;
    position.porcentajePnsion = porcentajePnsion;
    position.porcentajeSalud = porcentajeSalud;
    position.porcentajePrimas = porcentajePrimas;

    await position.save();
    return;
  }
}
