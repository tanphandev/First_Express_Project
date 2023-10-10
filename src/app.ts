import express from "express";
import bodyParser from "body-parser";
import apiRoute from "./routes";
import { Logger } from "./lib/logger";
import { middlewares } from "./middleware/errorHandler";

const app = express();
const logger = new Logger();

/* json()*/
app.use(express.json());
/* body parse */
app.use(bodyParser.urlencoded({ extended: true }));
/* get request log */
// app.use(logger.getRequestLogger());

/* api routes */
app.use("/api", apiRoute);

/* get request error */
// app.use(logger.getRequestErrorLogger());

/* handle request error */
app.use(middlewares.handleRequestError);

export default app;
