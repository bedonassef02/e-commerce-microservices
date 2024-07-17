import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const logger = new Logger('LoggerMiddleware');

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const start = Date.now(); // Capture the current timestamp when the request starts

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - start; // Calculate the duration of the request in milliseconds

      if (statusCode >= 400) {
        logger.error(`${method} ${url} - ${statusCode} (${duration}ms)`);
      } else {
        logger.log(`${method} ${url} - ${statusCode} (${duration}ms)`);
      }
    });

    next();
  }
}
