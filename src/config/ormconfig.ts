import { DataSourceOptions } from 'typeorm';
import { getConfig } from '.';
import { entities } from '@app/db/entity';
const config = getConfig();

export const connectionOptions: DataSourceOptions = {
  type: 'postgres',
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB_NAME,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  logging: false,
  synchronize: false,
  migrationsRun: false,
  entities,
  migrations: [`${__dirname}/**/migration/*.{ts,js}`],
};
