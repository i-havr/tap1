import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TapController } from './tap.controller';
import { TapService } from './tap.service';
import { Tap } from '@app/db/entity/Tap';

@Module({
  imports: [TypeOrmModule.forFeature([Tap])],
  controllers: [TapController],
  providers: [TapService],
  exports: [],
})
export class TapModule {}
