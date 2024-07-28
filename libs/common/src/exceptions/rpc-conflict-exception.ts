import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';

export class RpcConflictException extends RpcException {
  constructor(message?: string) {
    message = `${message} already exists`;
    super({
      status: HttpStatus.NOT_FOUND,
      message,
    });
  }
}
