import { IDB } from '@app/common/utils/interfaces/db.interface';
import * as path from 'node:path';
import { ConfigService } from '@nestjs/config';

export class MySQLDB extends IDB {
  private readonly backupDir: string;
  private user: string;
  private password: string;
  private host: string;
  private port: number;

  constructor(
    public readonly db: string,
    private readonly configService: ConfigService,
  ) {
    super();
    this.backupDir = path.resolve(__dirname, '../../../backups/sql');
    this.loadDatabaseConfig();
    this.file = this.constructFilePath();
    this.getCommand();
  }

  private loadDatabaseConfig(): void {
    this.user = this.configService.get<string>('SQL_DB_USER');
    this.password = this.configService.get<string>('SQL_DB_PASSWORD');
    this.host = this.configService.get<string>('SQL_DB_HOST');
    this.port = this.configService.get<number>('SQL_DB_PORT') || 3306;
  }

  private constructFilePath(): string {
    return path.join(
      this.backupDir,
      `backup-sql-${this.db.toLowerCase()}-${new Date().toISOString().slice(0, 10)}.sql.gz`,
    );
  }

  private getCommand(): void {
    this.command = `mysqldump -u${this.user} -p${this.password} -h${this.host} -P${this.port} ${this.db} | gzip > ${this.file}`;
  }
}
