import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { HireJobService } from './hire-job.service';
import { ThueCongViec } from '@prisma/client';

class HireJobDTO {
    @ApiProperty()
    ma_cong_viec: string;
  
    @ApiProperty()
    ma_nguoi_thue: string;
  
    @ApiProperty()
    ngay_thue: string;
  
    @ApiProperty()
    hoan_thanh: string;
  }
  @ApiTags('Hire Job')
@Controller('hire-job')
export class HireJobController {
    constructor(private readonly hireJobService: HireJobService) {}

    // Get all thuê công việc
    @Get('get-all')
    getAllHireJob() {
      return this.hireJobService.getAllHireJob();
    }
  
    // Lấy danh sách Lấy danh sách thuê công việc theo id theo id
    @ApiQuery({ name: 'jobToHireId', type: 'number' })
    @Get('getById')
    getById(@Query('jobToHireId') jobToHireId: string) {
      const parsedJobToHireId = parseInt(jobToHireId, 10);
      return this.hireJobService.getById(parsedJobToHireId);
    }
  
    // Thuê công việc
    @ApiBody({ type: HireJobDTO })
    @Post('hire')
    hireJob(@Body() hireJobInfo: Partial<ThueCongViec>) {
      return this.hireJobService.hireJob(hireJobInfo);
    }
  
    // UPDATE thuê công việc
    @ApiBody({ type: HireJobDTO })
    @ApiQuery({ name: 'jobToHireId', type: 'number' })
    @Put('update')
    updateHireJob(
      @Body() hireJobInfo: Partial<ThueCongViec>,
      @Query('jobToHireId') jobToHireId: string,
    ) {
      const parsedJobToHireId = parseInt(jobToHireId, 10);
      return this.hireJobService.update(parsedJobToHireId, hireJobInfo);
    }
  
    // XÓA thuê công việc
    @ApiQuery({ name: 'jobToHireId', type: 'number' })
    @Delete('delete')
    delete(@Query('jobToHireId') jobToHireId: string){
      const parsedJobToHireId = parseInt(jobToHireId, 10);
      return this.hireJobService.delete(parsedJobToHireId);
    }
  }
