import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';

export const registerRedis = () =>
  CacheModule.register({
    store: redisStore as any,
    host: 'localhost',
    port: 6379,
    ttl: 600,
  });
