import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/CustomError";
import winston, { format } from "winston";

const customTimestampFormat = format((info, opts) => {
  if (opts.tz) {
    info.timestamp = new Date().toLocaleString("pl-PL", { timeZone: opts.tz });
  } else {
    info.timestamp = new Date().toLocaleString("pl-PL");
  }
  return info;
});

const logFormat = winston.format.combine(
  customTimestampFormat(),
  winston.format.simple()
);

const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof CustomError) {
    logger.error(`${err.statusCode} - ${err.message}`, {
      error: err,
      stack: err.stack,
    });

    res.status(err.statusCode).json({ message: err.message });
  } else {
    logger.error(`500 - Internal Server Error`, {
      error: err,
      stack: err.stack,
    });

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { errorHandler };
