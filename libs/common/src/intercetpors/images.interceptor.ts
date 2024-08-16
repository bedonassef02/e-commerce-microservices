import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ImagesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const cover = request.files['cover'];
    const images = request.files['images'];
    if (cover) {
      request.body['cover'] = cover[0].filename;
    }
    if (images) {
      request.body['images'] = images.map((image) => image.filename);
    }

    return next.handle();
  }
}
