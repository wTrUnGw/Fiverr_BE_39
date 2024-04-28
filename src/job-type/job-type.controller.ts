import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LoaiCongViec } from '@prisma/client';
import { JobTypeService } from './job-type.service';


class newJobType {
    @ApiProperty()
    ten_loai_cong_viec: string;
  }
  
  class JobType {
    @ApiProperty()
    ten_loai_cong_viec: string;
  }
@ApiTags('Job Type')
@Controller('job-type')
export class JobTypeController { constructor(private readonly jobTypeService: JobTypeService) {}

// Thêm loại công việc mới
@ApiBody({
  type: newJobType,
})
@Post('add')
addJobType(@Body() body: any) {
  return this.jobTypeService.addJobType(body);
}

// Lấy hết loại công việc
@Get('get-all')
getAllJobType() {
  return this.jobTypeService.getAllJobType();
}

// Lấy chi tiết loại công việc
@ApiQuery({ name: 'jobTypeId', type: 'number' })
@Get('getById')
getJobTypeById(@Query('jobTypeId') jobTypeId: string) {
  const parsedJobTypeId = parseInt(jobTypeId, 10);
  return this.jobTypeService.getJobTypeById(parsedJobTypeId);
}

// Sửa loại công việc
@ApiBody({ type: newJobType })
@Put('update')
async updateJobType(
  @Query('jobTypeId') jobTypeId: string,
  @Body() updatedData: Partial<LoaiCongViec>, // Sử dụng Partial để chấp nhận các trường tùy chọn
) {
  const parsedJobTypeId = parseInt(jobTypeId, 10);
  const result = await this.jobTypeService.updateJobType(
    parsedJobTypeId,
    updatedData,
  );
  return result;
}

// Xóa loại công việc
@ApiQuery({ name: 'jobTypeId', type: 'number' })
@Delete('delete')
deleteJobType(@Query('jobTypeId') jobTypeId: string) {
  const parsedJobTypeId = parseInt(jobTypeId, 10); // Sử dụng parseInt để chuyển đổi chuỗi thành số
  return this.jobTypeService.deteleJobType(parsedJobTypeId);
}
}
