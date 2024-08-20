import { BackupService } from '@app/common/services/backup.service';
import { ConfigService } from '@nestjs/config';
import { MongoDB } from '@app/common/utils/interfaces/mongo-db.interface';
import { Product } from '../../entities/product.entity';

export const productBackup = {
  provide: BackupService,
  useFactory: (configService: ConfigService) => {
    return new BackupService(new MongoDB(Product.name, configService));
  },
  inject: [ConfigService],
};
