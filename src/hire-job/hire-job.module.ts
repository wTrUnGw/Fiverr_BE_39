import { Module } from '@nestjs/common';
import { HireJobController } from './hire-job.controller';
import { HireJobService } from './hire-job.service';

@Module({
  controllers: [HireJobController],
  providers: [HireJobService]
})
export class HireJobModule {}
