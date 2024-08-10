import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { validationSchema } from '@app/common/utils/validation';

@Global()
@Module({})
export class CommonModule {
  static register(validation: any = validationSchema): DynamicModule {
    const configModuleOptions: ConfigModuleOptions = {
      isGlobal: true,
      expandVariables: true,
      validationSchema: validation,
    };

    return {
      module: CommonModule,
      imports: [ConfigModule.forRoot(configModuleOptions)],
    };
  }
}
