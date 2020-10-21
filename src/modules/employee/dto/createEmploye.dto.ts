import { IsNotEmpty, IsEmail, IsString, IsNumber, Max } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly document: number;

  @IsNotEmpty()
  @IsNumber()
  readonly phone: number;

  @IsNotEmpty()
  @IsString()
  readonly addres: string;

  @IsNotEmpty()
  @IsNumber()
  readonly positionId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly salario: number;
}
