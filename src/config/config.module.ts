import { Module } from '@nestjs/common';
import { configService } from './config.service';

@Module({
  providers: [
    {
      provide: configService,
      useValue: new configService(),
    },
  ],
  exports: [configService],
})
export class ConfigModule {}
