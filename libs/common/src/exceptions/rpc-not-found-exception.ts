import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';

export class RpcNotFoundException extends RpcException {
  constructor(message?: string) {
    message = `${message || 'Resource'} not found`;
    super({
      status: HttpStatus.NOT_FOUND,
      message,
    });
  }
}
