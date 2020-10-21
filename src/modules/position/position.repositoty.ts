import { Repository, EntityRepository } from 'typeorm';
import { Position } from './position.entity';

@EntityRepository(Position)
export class PositionRepository extends Repository<Position> {}
