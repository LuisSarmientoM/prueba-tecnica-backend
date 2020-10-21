import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Position } from '../position/position.entity';
import { Employee } from './employee.entity';

@Entity('employees_salary')
export class EmployeeSalary extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => Employee, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'employee_id' })
  employeId: number;

  @Column({ type: 'varchar' })
  positionName: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false })
  salario: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
  })
  impuestos: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
  })
  salud: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
  })
  pension: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
  })
  primas: number;
}
