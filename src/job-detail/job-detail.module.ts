import { Module } from '@nestjs/common';
import { JobDetailController } from './job-detail.controller';
import { JobDetailService } from './job-detail.service';

@Module({
  controllers: [JobDetailController],
  providers: [JobDetailService]
})
export class JobDetailModule {}
