import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TapModule } from './modules/tap/tap.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from './config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    TapModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
