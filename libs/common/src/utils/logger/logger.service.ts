import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

export class CustomLoggerService implements LoggerService {
  private infoLogger: winston.Logger;
  private errorLogger: winston.Logger;

  constructor(name: string) {
    this.initializeLoggers(name);
  }

  private initializeLoggers(name: string) {
    // Define transports for info level
    const infoTransport = new winston.transports.DailyRotateFile({
      filename: `logs/${name}/info-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    });

    // Define transports for error level
    const errorTransport = new winston.transports.DailyRotateFile({
      filename: `logs/${name}/error-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    });

    // Create the info logger with its transport
    this.infoLogger = winston.createLogger({
      transports: [infoTransport],
    });

    // Create the error logger with its transport
    this.errorLogger = winston.createLogger({
      transports: [errorTransport],
    });
  }

  log(message: any, context?: string) {
    this.infoLogger.info(message, { context });
  }

  error(message: any, trace?: string, context?: string) {
    this.errorLogger.error(message, { context, trace });
  }

  warn(message: any, context?: string) {
    this.infoLogger.warn(message, { context });
  }

  debug(message: any, context?: string) {
    this.infoLogger.debug(message, { context });
  }

  verbose(message: any, context?: string) {
    this.infoLogger.verbose(message, { context });
  }
}
