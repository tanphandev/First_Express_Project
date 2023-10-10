import app from "./app";
import dotenv from "dotenv";
import databaseService from "./app/services/database.service";
import config from "./config/environment/config";
import { Logger } from "./lib/logger";

dotenv.config();
const PORT = config["PORT"];
const logger = new Logger();
databaseService.createConnection().then(() => {
  /* listen with port */
  app.listen(PORT, () => {
    logger.log("info", `App listening on ${PORT}`);
  });
});
