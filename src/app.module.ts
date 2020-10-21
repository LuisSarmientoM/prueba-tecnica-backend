import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { configService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { PositionModule } from './modules/position/position.module';

@Module({
  imports: [ConfigModule, DatabaseModule, EmployeeModule, PositionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: configService) {
    AppModule.port = _configService.get(Configuration.PORT);
  }
}
