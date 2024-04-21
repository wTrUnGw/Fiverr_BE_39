import { Body, Controller, Delete, Get, Headers, Post, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

class user {
    @ApiProperty()
    uname: string;
  
    @ApiProperty()
    email: string;
  
    @ApiProperty()
    pass_word: string;
  
    @ApiProperty()
    phone: string;
  
    @ApiProperty()
    birth_day: string;
  
    @ApiProperty()
    gender: string;
  
    @ApiProperty()
    role: string;
  
    @ApiProperty()
    skill: string;
  
    @ApiProperty()
    certification: string;
  }
  
  @ApiTags('User')
  @Controller('user')
export class UserController {constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  // Lấy hết user
  @Get('get-all')
  getAllUser() {
    return this.userService.getAllUser();
  }

  // Lấy user theo ID
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('getById')
  getUserById(@Headers('Authorization') authHeader: string) {
    // Kiểm tra xem header có tồn tại không
    if (!authHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    // Lấy token từ header
    const token = authHeader.replace('Bearer ', '');

    try {
      // Giải mã token
      const decodedToken = this.jwtService.verify(token, { secret: 'BI_MAT' });

      // Lấy userId từ thông tin giải mã
      const userId = decodedToken.data.userId;

      // Gọi service để lấy thông tin user
      return this.userService.getUserById(userId);
    } catch (error) {
      // Xử lý lỗi khi giải mã không thành công
      throw new UnauthorizedException('Invalid token');
    }
  }

  // Add user
  @ApiBody({
    type: user,
  })
  @Post('add')
  addJobType(@Body() body: any) {
    return this.userService.addUser(body);
  }

  // Edit user
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({
    type: user,
  })
  @Put('update')
  updateUser(@Headers('Authorization') authHeader: string, @Body() body: any) {
    // Kiểm tra xem header có tồn tại không
    if (!authHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    // Lấy token từ header
    const token = authHeader.replace('Bearer ', '');

    try {
      // Giải mã token
      const decodedToken = this.jwtService.verify(token, { secret: 'BI_MAT' });

      // Lấy userId từ thông tin giải mã
      const userId = decodedToken.data.userId;

      // Gọi service để lấy thông tin user
      return this.userService.updateUser(userId, body);
    } catch (error) {
      // Xử lý lỗi khi giải mã không thành công
      throw new UnauthorizedException('Invalid token');
    }
  }

  // Xóa user
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  deleteUser(@Headers('Authorization') authHeader: string) {
    // Kiểm tra xem header có tồn tại không
    if (!authHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    // Lấy token từ header
    const token = authHeader.replace('Bearer ', '');

    try {
      // Giải mã token
      const decodedToken = this.jwtService.verify(token, { secret: 'BI_MAT' });

      // Lấy userId từ thông tin giải mã
      const userId = decodedToken.data.userId;

      // Gọi service để lấy thông tin user
      return this.userService.deleteUser(userId);
    } catch (error) {
      // Xử lý lỗi khi giải mã không thành công
      throw new UnauthorizedException('Invalid token');
    }
  }
}
