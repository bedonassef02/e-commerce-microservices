import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { exec } from 'child_process';
import { IDB } from '@app/common/utils/interfaces/db.interface';

@Injectable()
export class BackupService {
  private readonly logger = new Logger(BackupService.name);

  constructor(private readonly db: IDB) {}

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  handleCron() {
    this.logger.debug('Initiating backup process...');
    this.backupDatabase();
  }

  backupDatabase(): void {
    const command = this.db.command;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        this.logger.error(`Backup failed: ${error.message}`, error.stack);
        return;
      }

      if (
        stderr &&
        !stderr.includes('writing') &&
        !stderr.includes('done dumping')
      ) {
        this.logger.warn(`Backup process warning: ${stderr}`);
      }

      this.logger.log(`Backup successfully created at ${this.db.file}`);
      this.logger.debug(`Backup command output: ${stdout}`);
      if (stderr.includes('writing') || stderr.includes('done dumping')) {
        this.logger.debug(`Backup progress: ${stderr}`);
      }
    });
  }
}
