import { catchError, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
const logger = new Logger();
export const throwException = catchError((err) => {
  logger.error(err.error || err.message);
  return throwError(
    () =>
      new RpcException({
        status: err.status,
        error: err.message || err.error,
      }),
  );
});
