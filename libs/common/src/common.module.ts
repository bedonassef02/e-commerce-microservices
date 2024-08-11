import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { validationSchema } from '@app/common/utils/validation';
import { CustomLoggerService } from '@app/common/utils/logger/logger.service';

@Global()
@Module({})
export class CommonModule {
  static register(
    validation: any = validationSchema,
    name: string = 'default',
  ): DynamicModule {
    const configModuleOptions: ConfigModuleOptions = {
      isGlobal: true,
      expandVariables: true,
      validationSchema: validation,
    };

    return {
      module: CommonModule,
      imports: [ConfigModule.forRoot(configModuleOptions)],
      providers: [
        {
          provide: CustomLoggerService,
          useFactory: () => new CustomLoggerService(name),
        },
      ],
      exports: [CustomLoggerService], // Export LoggerService so it can be used in other modules
    };
  }
}
