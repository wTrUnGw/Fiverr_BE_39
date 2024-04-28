import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JobModule } from './job/job.module';
import { JobTypeModule } from './job-type/job-type.module';
import { JobDetailModule } from './job-detail/job-detail.module';
import { HireJobModule } from './hire-job/hire-job.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
  }), JobModule, JobTypeModule, JobDetailModule, HireJobModule, CommentModule,],
  controllers: [AppController],
  providers: [AppService,JwtStrategy],
})
export class AppModule { }
