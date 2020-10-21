import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('position')
export class Position extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({
    type: 'decimal',
    precision: 4,
    scale: 2,
  })
  porcentajeImpuestos: number;

  @Column({
    type: 'decimal',
    precision: 4,
    scale: 2,
  })
  porcentajeSalud: number;

  @Column({
    type: 'decimal',
    precision: 4,
    scale: 2,
  })
  porcentajePnsion: number;

  @Column({
    type: 'decimal',
    precision: 4,
    scale: 2,
  })
  porcentajePrimas: number;
}
