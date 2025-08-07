
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnApplicationBootstrap {
  constructor(private readonly dataSource: DataSource) {}

  async onApplicationBootstrap() {
    try {
      if (this.dataSource.isInitialized) {
        console.log('✅ PostgreSQL Connected Successfully.');
      } else {
        await this.dataSource.initialize();
        console.log('✅ PostgreSQL Connected Successfully.');
      }
    } catch (error) {
      console.error('❌ PostgreSQL Connection Failed:', error);
    }
  }
}
