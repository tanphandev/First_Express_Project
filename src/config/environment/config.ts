import dotenv from "dotenv";
dotenv.config();
const EXPRESS_PUBLIC_ENV = process.env.EXPRESS_PUBLIC_ENV || "lcl";
const config = require(`./${EXPRESS_PUBLIC_ENV}.json`);
export default config;
