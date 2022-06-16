import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';
import { ResetPasswordDto } from './dto/create-user.dto';
import { ShoppingPrefService } from 'src/shopping-pref/shopping-pref.service';
export declare class UsersService {
    private prisma;
    private mailService;
    private shoppingPrefService;
    constructor(prisma: PrismaService, mailService: MailService, shoppingPrefService: ShoppingPrefService);
    create(createUserDto: Prisma.UserCreateInput): Promise<import(".prisma/client").User>;
    verifyEmail(token: string): Promise<string>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<string>;
    findUser(email: string): Promise<import(".prisma/client").User>;
    sendResetPasswordLink(email: string): Promise<string>;
    findAll(): string;
    findOne(id: number): Promise<{
        fullName: string;
        email: string;
        dateOfBirth: string;
        createdAt: Date;
        id: number;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
