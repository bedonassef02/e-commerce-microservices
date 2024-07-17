// logging.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('RPC');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const ctx = context.switchToRpc();
    const data = ctx.getData();

    this.logger.log(`Incoming message: ${JSON.stringify(data)}`);

    return next
      .handle()
      .pipe(tap(() => this.logger.log(`Response time: ${Date.now() - now}ms`)));
  }
}
