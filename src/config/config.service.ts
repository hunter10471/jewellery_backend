import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config(); //eslint-disable-line

class ConfigService {
  constructor(private env: { [key: string]: string | undefined }) {}
  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing)
      throw new Error(`Config missing env key (${key})`);
    return value;
  }
  public valuesExist(keys: string[]) {
    keys.forEach((key) => this.getValue(key, true));
    return this;
  }
  public getPort() {
    return this.getValue('PORT');
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: ['**/*.entity{.ts,.js}'],

      migrationsTableName: 'migration',

      migrations: ['src/migration/*.ts'],
      ssl: this.isProduction(),
    };
  }
}

const configService = new ConfigService(process.env).valuesExist([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { configService };
