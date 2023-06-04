import { DataSource } from 'typeorm';
import { configuration } from './config';

const dataSourceConfig = configuration.getDataSourceConfig();
export const dataSource = new DataSource(dataSourceConfig);
