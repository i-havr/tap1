import { Controller } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { TapService } from './tap.service';

@Controller('api/tap')
export class TapController {
  constructor(private readonly tapService: TapService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async tapCron() {
    console.log('CHECK', new Date().toLocaleTimeString());

    await this.tapService.tapFirebase();
  }
}
