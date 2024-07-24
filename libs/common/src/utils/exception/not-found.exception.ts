import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';

export function notFoundException(name: string): RpcException {
  throw new RpcException({
    status: HttpStatus.NOT_FOUND,
    message: `${name} not found`,
  });
}
