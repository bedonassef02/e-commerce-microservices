import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
  Logger,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TimeoutInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          const service = context.getClass().name.replace('Controller', '');
          const handlerName = context.getHandler().name;
          const message = `Request to ${service} timed out after 5 seconds. The service might be experiencing issues or could be down. Please check the service status and try again.`;
          this.logger.error(message);
          return throwError(() => new RequestTimeoutException(message));
        }
        return throwError(() => err);
      }),
    );
  }
}
