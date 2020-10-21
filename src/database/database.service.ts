import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { configService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';
import { Configuration } from '../config/config.keys';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [configService],
    async useFactory(config: configService) {
      return {
        type: 'mysql',
        host: config.get(Configuration.HOST),
        username: config.get(Configuration.USERNAME),
        port: Number(config.get(Configuration.DATABASE_PORT)),
        database: config.get(Configuration.DATABASE),
        password: config.get(Configuration.PASSWORD),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];
