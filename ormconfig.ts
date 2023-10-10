import config from "./src/config/environment/config";
module.exports = {
  type: "mysql",
  port: config["DB_PORT"],
  host: config["DB_HOST"],
  username: config["DB_USER"],
  password: config["DB_PASSWORD"],
  database: config["DB_NAME"],
  entities: ["src/entities/*.entity.ts"],
  migrations: ["src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "src/database/migrations",
  },
  synchronize: true,
};
