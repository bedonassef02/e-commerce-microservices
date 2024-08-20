import { BackupService } from '@app/common/services/backup.service';
import { ConfigService } from '@nestjs/config';
import { MySQLDB } from '@app/common/utils/interfaces/sql-db.interface';
import { Category } from '../../entities/category.entity';

export const categoryBackup = {
  provide: BackupService,
  useFactory: (configService: ConfigService) => {
    return new BackupService(new MySQLDB(Category.name, configService));
  },
  inject: [ConfigService],
};
