import { existsSync, readFileSync } from 'fs';
import { parse } from 'dotenv';
export class configService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

    if (isDevelopmentEnv) {
      const envFilePath = __dirname + '/../../.env';

      const existPath = existsSync(envFilePath);

      if (!existPath) {
        console.log(envFilePath);

        console.log('.env no existe');
        process.exit(0);
      }

      this.envConfig = parse(readFileSync(envFilePath));
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
        HOST: process.env.HOST,
        USERNAME: process.env.USERNAME,
        PASSWORD: process.env.PASSWORD,
        DATABASE: process.env.DATABASE,
        DATABASE_PORT: process.env.DATABASE_PORT,
      };
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
