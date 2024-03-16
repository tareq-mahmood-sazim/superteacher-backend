import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import * as winston from "winston";
import "winston-daily-rotate-file";

function createLogDirectory() {
  const logDir = join(process.cwd(), process.env.LOGGER_LOG_DIR || "logs");
  if (!existsSync(logDir)) {
    mkdirSync(logDir);
  }
  return logDir;
}

function getLogFormat() {
  const logFormat = winston.format.printf(
    ({ timestamp, level, message, context }) =>
      `${new Date(timestamp).toLocaleString()} [${level}] ${context ? `[${context}]` : ""} ${
        typeof message === "object" ? JSON.stringify(message) : message
      }`,
  );
  return logFormat;
}

export default function getWinstonLoggerTransports() {
  const maxLogFiles = process.env.LOGGER_NUM_MAX_LOG_FILES;
  const logDir = createLogDirectory();
  const logFormat = getLogFormat();

  const format = winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.colorize(),
    logFormat,
  );

  return [
    new winston.transports.DailyRotateFile({
      format,
      level: "debug",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/debug",
      filename: `%DATE%.log`,
      maxFiles: maxLogFiles,
      json: false,
      zippedArchive: true,
    }),

    new winston.transports.DailyRotateFile({
      format,
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/error",
      filename: `%DATE%.log`,
      maxFiles: maxLogFiles,
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),

    new winston.transports.Console({
      format,
      level: "debug",
      handleExceptions: true,
    }),
  ];
}
