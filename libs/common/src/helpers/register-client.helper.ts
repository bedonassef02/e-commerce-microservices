import { RMQ_URL } from '@app/common/utils/constants/constants';
import { Transport } from '@nestjs/microservices';
import { MessagePatterns } from '@app/common/utils/types/message-pattern.interface';
import { ClientProviderOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';

export const registerClient = (
  messagePattern: MessagePatterns,
): ClientProviderOptions => {
  return {
    name: messagePattern.NAME,
    transport: Transport.RMQ,
    options: {
      urls: [RMQ_URL],
      queue: messagePattern.QUEUE,
    },
  };
};
