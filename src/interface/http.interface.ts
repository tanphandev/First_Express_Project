import { Request } from "express";

interface IRequest extends Request {
  [k: string]: any;
}

export { IRequest };
