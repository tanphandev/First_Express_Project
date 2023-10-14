import EventEmitter from "events";
import { Logger } from "../../lib/logger";
import { dataSource } from "../../../ormconfig";

class DatabaseService {
  public static isConnected: boolean = false;
  public static logger = new Logger();
  public static emitter: EventEmitter = new EventEmitter();

  public static async getConnection() {
    DatabaseService.handleConnectionError();
    return await DatabaseService.createConnection();
  }

  public static async createConnection() {
    return await dataSource
      .initialize()
      .then(() => {
        DatabaseService.isConnected = true;
        DatabaseService.logger.log("info", "database connected successfully");
      })
      .catch((e: any) => {
        DatabaseService.logger.log(
          "info",
          "database connection error...retrying"
        );
        DatabaseService.emitter.emit("DB_CONNECT_ERROR");
      });
  }

  public static async handleConnectionError() {
    DatabaseService.emitter.on("DB_CONNECT_ERROR", async () => {
      DatabaseService.logger.log(
        "info",
        "database connection error...retrying"
      );
      setTimeout(async () => {
        await DatabaseService.createConnection();
      }, 3000);
    });
  }
}

export default DatabaseService;
