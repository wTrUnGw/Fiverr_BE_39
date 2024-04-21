import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
// check mật khẩu trên client với mật khẩu đã mã hóa trong cơ sở dữ liệu
async function comparePasswords(
    clientPassword: string,
    hashedPassword: string,
): Promise<boolean> {
    return bcrypt.compare(clientPassword, hashedPassword);
}
@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService

    ) { }
    prisma = new PrismaClient();

    // Đăng kí
    async signUp(body: {
        uname: string;
        email: string;
        pass_word: string;
        phone: string;
        birth_day: string;
        gender: string;
        role: string;
        skill: string;
        certification: string;
    }): Promise<string> {
        // Check người dùng có tồn tại không
        const existingUser = await this.prisma.nguoiDung.findFirst({
            where: {
                email: body.email,
            } as { email: string },
        });

        if (existingUser) {
            // Người dùng đã tồn tại
            return 'Người dùng đã tồn tại';
        }

        // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
        const hashedPassword = await bcrypt.hash(body.pass_word, 10);
        // Nếu người dùng không tồn tại, tạo mới người dùng
        const newUser = await this.prisma.nguoiDung.create({
            data: {
                uname: body.uname,
                email: body.email,
                pass_word: hashedPassword,
                phone: body.phone,
                birth_day: body.birth_day,
                gender: body.gender,
                role: body.role,
                skill: body.skill,
                certification: body.certification,
            },
        });

        // Trả về thông tin của người dùng mới tạo
        return 'Người dùng đã được tạo mới';
    }

    // Đăng nhập
    async signIn(body: { email: string; pass_word: string }): Promise<string> {
        const user = await this.prisma.nguoiDung.findFirst({
            where: {
                email: body.email,
            },
        });

        if (!user) {
            // Người dùng không tồn tại
            return 'Người dùng không tồn tại';
        }

        // Sử dụng hàm comparePasswords để kiểm tra mật khẩu khi đăng nhập
        const isPasswordCorrect = await comparePasswords(
            body.pass_word,
            user.pass_word,
        );

        if (isPasswordCorrect) {
            // Mật khẩu đúng, thực hiện đăng nhập

            let token = await this.jwtService.signAsync(
                { data: { userId: user.id } },
                { expiresIn: '60m', secret: 'BI_MAT' },
            );

            // Đăng nhập thành công
            return `Đăng nhập thành công ${token}`;
        } else {
            // Mật khẩu không đúng
            return 'Mật khẩu không đúng';
        }
    }
}