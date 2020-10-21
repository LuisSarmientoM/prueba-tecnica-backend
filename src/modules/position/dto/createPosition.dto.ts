import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePositionDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly porcentajeImpuestos: number;

  @IsNotEmpty()
  @IsString()
  readonly porcentajeSalud: number;

  @IsNotEmpty()
  @IsNumber()
  readonly porcentajePnsion: number;

  @IsNotEmpty()
  @IsNumber()
  readonly porcentajePrimas: number;
}
