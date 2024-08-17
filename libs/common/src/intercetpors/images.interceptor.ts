import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class ImagesInterceptor implements NestInterceptor {
  constructor(private readonly hasImages: boolean = false) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    const cover = request.files?.['cover'];
    if (cover) {
      request.body['cover'] = cover[0].filename;
    }

    if (this.hasImages) {
      this.handleImages(request);
    }

    return next.handle().pipe(tap(() => {}));
  }

  private handleImages(request: Request): void {
    const images = request.files?.['images'];
    if (images) {
      request.body['images'] = images.map((image: any) => image.filename);
    }
  }
}
