import { IsNotEmpty, IsEmail, IsString, IsNumber, Max } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadEmployeeDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly name: string;

  @Expose()
  readonly document: string;

  @Expose()
  readonly phone: string;

  @Expose()
  readonly addres: string;
}
