import { Body, Controller, Delete, Get, Post, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { UploadDto } from 'src/uploadDTO';
import { JobDetailService } from './job-detail.service';

@ApiTags('Job Detail')
@Controller('job-detail')
export class JobDetailController {constructor(private readonly jobDetailService: JobDetailService) {}

// Get all công việc chi tiết
@Get('get-all')
getAllJobDetail() {
  return this.jobDetailService.getAllJobDetail();
}

// Get công việc chi tiết
@ApiQuery({ name: 'jobDetailId', type: 'number' })
@Get('getById')
getJobDetailByID(@Query('jobDetailId') jobDetailId: string) {
  const parsedJobDetailId = parseInt(jobDetailId, 10); // Sử dụng parseInt để chuyển đổi chuỗi thành số
  return this.jobDetailService.getJobDetailByID(parsedJobDetailId);
}

// Add công viêc chi tiết
@ApiConsumes('multipart/form-data')
@ApiBody({
  type: UploadDto,
})
@UseInterceptors(
  FilesInterceptor('avatar', 10, {
    storage: diskStorage({
      destination: process.cwd() + '/public/img',
      filename: (req, file, callback) =>
        callback(null, new Date().getTime() + '_' + file.originalname),
    }),
  }),
)
@Post('add')
uploaAdd(
  @UploadedFiles() file: Express.Multer.File[],
  @Body() body: UploadDto,
) {
  const newJobDetail = {
    tenChiTiet: body.ten_chi_tiet,
    maLoaiCongViec: parseInt(body.ma_loai_cong_viec, 10),
    hinhAnh: file[0].path,
  };

  return this.jobDetailService.addJobDetail(newJobDetail);
}

// update job detail
@ApiConsumes('multipart/form-data')
@ApiBody({
  type: UploadDto,
})
@UseInterceptors(
  FilesInterceptor('avatar', 10, {
    storage: diskStorage({
      destination: process.cwd() + '/public/img',
      filename: (req, file, callback) =>
        callback(null, new Date().getTime() + '_' + file.originalname),
    }),
  }),
)
@Put('update')
uploaUpdate(
  @UploadedFiles() file: Express.Multer.File[],
  @Body() body: UploadDto,
  @Query('jobDetailId') jobDetailId: string,
) {
  const parsedJobTypeId = parseInt(jobDetailId, 10);
  const newJobDetail = {
    tenChiTiet: body.ten_chi_tiet,
    maLoaiCongViec: parseInt(body.ma_loai_cong_viec, 10),
    hinhAnh: file[0].path,
  };

  return this.jobDetailService.updateJobDetail(parsedJobTypeId, newJobDetail);
}

// Xóa job detail
@ApiQuery({ name: 'jobDetailId', type: 'number' })
@Delete('delete')
deleteJobType(@Query('jobDetailId') jobDetailId: string) {
  const parsedJobDetailId = parseInt(jobDetailId, 10);
  return this.jobDetailService.deteleJobDetail(parsedJobDetailId);
}
}
