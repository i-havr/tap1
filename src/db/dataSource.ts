import { DataSource, DataSourceOptions } from 'typeorm';
import { entities } from './entity';
import { getConfig } from 'src/config';

const config = getConfig();

export interface DBConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export const getConnectionOptions = (
  dbConfig: DBConfig,
  host?: string,
): DataSource => {
  const config = dbConfig;

  const connectionOptions: DataSourceOptions = {
    type: 'postgres',
    host: host || config.host,
    port: config.port,
    database: config.database,
    username: config.username,
    password: config.password,
    logging: false,
    synchronize: false,
    migrationsRun: false,
    entities,
    migrations: [`${__dirname}/**/migration/*.{ts,js}`],
  };

  const dataSource = new DataSource(connectionOptions);

  return dataSource;
};

const dataSource = getConnectionOptions({
  database: config.DB_NAME,
  host: config.DB_HOST,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
  username: config.DB_USER,
});

export default dataSource;
