import { UsersService } from './users.service';
import { CreateUserDto, ResetPasswordDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import(".prisma/client").User>;
    verifyEmail(token: string): Promise<string>;
    sendResetPasswordLink(email: string): Promise<string>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<string>;
    findOne(id: string): Promise<{
        fullName: string;
        email: string;
        dateOfBirth: string;
        createdAt: Date;
        id: number;
    }>;
}
