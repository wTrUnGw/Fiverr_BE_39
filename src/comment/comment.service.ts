import { Injectable } from '@nestjs/common';
import { BinhLuan, PrismaClient } from '@prisma/client';

@Injectable()
export class CommentService { prisma = new PrismaClient();

    // Get all các bình luận
    async getAllComment(): Promise<BinhLuan[]> {
      const allComment = await this.prisma.binhLuan.findMany();
      return allComment;
    }
  
    // Get bình luận theo ID
    async getCommentById(commentId: number): Promise<BinhLuan | string> {
      const selectedComment = await this.prisma.binhLuan.findFirst({
        where: {
          id: commentId,
        },
      });
  
      if (selectedComment) {
        return selectedComment;
      } else {
        return 'Bình luận không tồn tại';
      }
    }
  
    // Add bình luận
    async addComment(comment: any): Promise<BinhLuan> {
      const newComment = await this.prisma.binhLuan.create({
        data: {
          ma_cong_viec: parseInt(comment.ma_cong_viec, 10),
          ma_nguoi_binh_luan: parseInt(comment.ma_nguoi_binh_luan, 10),
          ngay_binh_luan: comment.ngay_binh_luan,
          noi_dung: comment.noi_dung,
          sao_binh_luan: parseInt(comment.sao_binh_luan, 10),
        },
      });
      return newComment;
    }
  
    // Edit bình luận
    async updateComment(
      commentId: number,
      comment: any,
    ): Promise<BinhLuan | string> {
      const selectedComment = await this.prisma.binhLuan.findFirst({
        where: {
          id: commentId,
        },
      });
  
      if (!selectedComment) {
        return 'Không tìm thấy bình luận';
      }
  
      const newComment = await this.prisma.binhLuan.update({
        where: { id: commentId },
        data: {
          ma_cong_viec:
            parseInt(comment.ma_cong_viec, 10) || selectedComment.ma_cong_viec,
          ma_nguoi_binh_luan:
            parseInt(comment.ma_nguoi_binh_luan, 10) ||
            selectedComment.ma_nguoi_binh_luan,
          ngay_binh_luan:
            comment.ngay_binh_luan || selectedComment.ngay_binh_luan,
          noi_dung: comment.noi_dung || selectedComment.noi_dung,
          sao_binh_luan:
            parseInt(comment.sao_binh_luan, 10) || selectedComment.sao_binh_luan,
        },
      });
  
      return newComment;
    }
  
    // Delete bình luận
    async deleteComment(commentId: number): Promise<string> {
      const selectedComment = this.prisma.binhLuan.findFirst({
        where: {
          id: commentId,
        },
      });
  
      if (!selectedComment) {
        return 'Tìm không ra bình luận để xóa';
      }
  
      await this.prisma.binhLuan.delete({
        where: {
          id: commentId,
        },
      });
      return 'Đã xóa bình luận';
    }
  }
