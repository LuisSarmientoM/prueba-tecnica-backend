import { Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionRepository } from './position.repositoty';

@Module({
  providers: [PositionService],
  controllers: [PositionController],
  imports: [TypeOrmModule.forFeature([PositionRepository])],
})
export class PositionModule {}
