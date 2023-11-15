import { DataSource, DataSourceOptions } from 'typeorm';
import config from '../config/configurantion';
export const dataSouceOptions: DataSourceOptions = config()
  .database as DataSourceOptions;
export const AppDataSource = new DataSource(dataSouceOptions);
