import { pinoHttp } from "pino-http";
import { pino } from "pino";

export const reqLogger = pinoHttp();

export const logger = pino();
