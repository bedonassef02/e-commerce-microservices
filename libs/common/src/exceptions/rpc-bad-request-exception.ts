import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';

export class RpcBadRequestException extends RpcException {
  constructor(message?: string) {
    super({
      status: HttpStatus.NOT_FOUND,
      message: message || 'Bad Request',
    });
  }
}
