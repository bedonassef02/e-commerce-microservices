import { BullModule } from '@nestjs/bullmq';
import { DynamicModule } from '@nestjs/common';

export function registerBull(): DynamicModule {
  return BullModule.forRoot({
    connection: {
      host: 'localhost',
      port: 6379,
    },
  });
}

export function registerQueue(name: string): DynamicModule {
  return BullModule.registerQueue({ name });
}
