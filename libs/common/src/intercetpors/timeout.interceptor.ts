import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
  Logger,
} from '@nestjs/common';
import { CustomI18nService } from 'apps/gateway/src/utils/services/custom-i18n.service';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private readonly i18nService: CustomI18nService) {}

  private readonly logger = new Logger(TimeoutInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          const service = context.getClass().name.replace('Controller', '');
          const message = `Request to ${service} timed out after 5 seconds.`;
          this.logger.error(message);
          const messageTranslation = this.getTranlations(service);
          return throwError(
            () => new RequestTimeoutException(messageTranslation),
          );
        }
        return throwError(() => err);
      }),
    );
  }

  getTranlations(service: string) {
    const serviceTranslation = this.i18nService.translate(
      `common.services.${service}`,
    );
    const messageTranslation = this.i18nService.translate(
      'common.timeout-exception',
      { args: { service: serviceTranslation } },
    );
    return messageTranslation;
  }
}
