import { IDB } from '@app/common/utils/interfaces/db.interface';
import * as path from 'node:path';
import { ConfigService } from '@nestjs/config';

export class MongoDB extends IDB {
  private readonly backupDir: string;
  private readonly uri: string;

  constructor(
    public readonly db: string,
    private readonly configService: ConfigService,
  ) {
    super();
    this.backupDir = path.resolve(__dirname, '../../../backups/mongo');
    this.uri = this.constructUri();
    this.file = this.constructFilePath();
    this.getCommand();
  }

  private constructUri(): string {
    const databaseUri = this.configService.get<string>('DATABASE_URI');
    return `${databaseUri}/${this.db}`;
  }

  private constructFilePath(): string {
    return path.join(
      this.backupDir,
      `backup-mongo-${this.db.toLowerCase()}-${new Date().toISOString().slice(0, 10)}.gz`,
    );
  }

  private getCommand(): void {
    this.command = `mongodump --uri="${this.uri}" --archive="${this.file}" --gzip`;
  }
}
