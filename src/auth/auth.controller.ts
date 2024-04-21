import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
class newUser {
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
  
  class existUser {
    @ApiProperty()
    email: string;
  
    @ApiProperty()
    pass_word: string;
  }
  
  @ApiTags('Auth')
  @Controller('auth')
export class AuthController { constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @ApiBody({
    type: newUser,
  })
  @Post('/sign-up')
  signUp(@Body() body: any) {
    return this.authService.signUp(body);
  }

  @ApiBody({
    type: existUser,
  })
  @Post('/sign-in')
  signIn(@Body() body: any) {
    return this.authService.signIn(body);
  }
}
