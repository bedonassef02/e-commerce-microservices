import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError, timeout } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RpcExceptionInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RpcExceptionInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000),
      catchError((err: any) => {
        this.logger.error(err.error || err.message);
        if (err instanceof HttpException) {
          // @ts-expect-error: get error fields
          throw new HttpException(err.getResponse());
        }
        return throwError(() => ({
          statusCode: err.status,
          message: err.error || err.message,
        }));
      }),
    );
  }
}
