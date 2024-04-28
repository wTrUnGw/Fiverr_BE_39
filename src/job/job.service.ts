import { Injectable } from '@nestjs/common';
import { CongViec, PrismaClient } from '@prisma/client';

@Injectable()
export class JobService { prisma = new PrismaClient();
    // Lấy hết tất cả công việc
    async getAllJob(): Promise<CongViec[]> {
      const allJob = await this.prisma.congViec.findMany();
      return allJob;
    }
  
    // Get Job theo ID
    async getJoblByID(jobId: number): Promise<CongViec | null> {
      const job = await this.prisma.congViec.findUnique({
        where: {
          id: jobId,
        },
      });
      return job;
    }
  
    // Add Job
    async addJob(newJob: any): Promise<CongViec> {
      const newJobAdded = await this.prisma.congViec.create({
        data: {
          ten_cong_viec: newJob.ten_cong_viec,
          danh_gia: newJob.danh_gia,
          gia_tien: newJob.gia_tien,
          hinh_anh: newJob.hinh_anh,
          mo_ta: newJob.mo_ta,
          mo_ta_ngan: newJob.mo_ta_ngan,
          sao_cong_viec: newJob.sao_cong_viec,
          ma_chi_tiet_loai: newJob.ma_chi_tiet_loai,
          nguoi_tao: newJob.nguoi_tao,
        },
      });
  
      return newJobAdded;
    }
  
    // UPDATE Job
    async updateJob(id: number, newJob: any): Promise<string> {
      const existingJob = await this.prisma.congViec.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!existingJob) {
        return 'Người dùng không tồn tại';
      }
  
      const updatedJob = await this.prisma.congViec.update({
        where: {
          id: id,
        },
        data: {
          ten_cong_viec: newJob.ten_cong_viec || existingJob.ten_cong_viec,
          danh_gia: newJob.danh_gia || existingJob.danh_gia,
          gia_tien: newJob.gia_tien || existingJob.gia_tien,
          hinh_anh: newJob.hinh_anh || existingJob.hinh_anh,
          mo_ta: newJob.mo_ta || existingJob.mo_ta,
          mo_ta_ngan: newJob.mo_ta_ngan || existingJob.mo_ta_ngan,
          sao_cong_viec: newJob.sao_cong_viec || existingJob.sao_cong_viec,
          ma_chi_tiet_loai:
            newJob.ma_chi_tiet_loai || existingJob.ma_chi_tiet_loai,
          nguoi_tao: newJob.nguoi_tao || existingJob.nguoi_tao,
        },
      });
  
      return 'Đã cập nhật công việc';
    }
  
    // XÓA JOB
    async deteleJob(jobId: number): Promise<string> {
      try {
        const existingJob = await this.prisma.congViec.findUnique({
          where: {
            id: jobId,
          },
        });
  
        if (!existingJob) {
          return 'Công việc không tồn tại';
        }
  
        // Delete user
        await this.prisma.congViec.delete({
          where: {
            id: jobId,
          },
        });
  
        return 'Đã xóa công việc ';
      } catch (error) {
        console.error('Error deleting user:', error);
        return 'Đã xảy ra lỗi khi xóa công việc ';
      }
    }
  }
