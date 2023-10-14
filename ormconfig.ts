import { DataSource, DataSourceOptions } from "typeorm";
import config from "./src/config/environment/config";

const connectionConfig: DataSourceOptions = {
  type: "mysql",
  port: config["DB_PORT"],
  host: config["DB_HOST"],
  username: config["DB_USER"],
  password: config["DB_PASSWORD"],
  database: config["DB_NAME"],
  entities: ["src/entities/*.entity.ts"],
  migrations: ["src/migrations/*.ts"],
  migrationsTableName: "history",
  logging: true,
  synchronize: false,
};
export const dataSource = new DataSource(connectionConfig);
