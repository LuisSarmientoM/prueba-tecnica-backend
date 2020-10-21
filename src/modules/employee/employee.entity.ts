import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employees')
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  name: string;

  @Column({ type: 'bigint', nullable: false })
  document: number;

  @Column({ type: 'varchar', nullable: false, length: 10 })
  phone: number;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  addres: string;
}
