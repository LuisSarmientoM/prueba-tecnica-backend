import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadPositionDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
  @Expose()
  porcentajeImpuestos: number;

  @Expose()
  porcentajeSalud: number;

  @Expose()
  porcentajePnsion: number;

  @Expose()
  porcentajePrimas: number;
}
