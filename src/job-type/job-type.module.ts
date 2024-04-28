import { Module } from '@nestjs/common';
import { JobTypeController } from './job-type.controller';
import { JobTypeService } from './job-type.service';

@Module({
  controllers: [JobTypeController],
  providers: [JobTypeService]
})
export class JobTypeModule {}
