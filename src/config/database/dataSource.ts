import { DataSource } from "typeorm";
import config from "../environment/config";
import { User } from "../../entities/user.entity";
export const dataSource = new DataSource({
  type: "mysql",
  port: config["DB_PORT"],
  host: config["DB_HOST"],
  username: config["DB_USER"],
  password: config["DB_PASSWORD"],
  database: config["DB_NAME"],
  entities: ["src/entities/*.entity.ts"],
  logging: true,
  synchronize: true,
});
