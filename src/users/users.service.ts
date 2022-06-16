import { BadGatewayException, BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';
import { v4 as uuid } from 'uuid';
import { ResetPasswordDto } from './dto/create-user.dto';
import { ShoppingPrefService } from 'src/shopping-pref/shopping-pref.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private mailService: MailService, private shoppingPrefService: ShoppingPrefService) { }

  async create(createUserDto: Prisma.UserCreateInput) {
    try {
      let existingUser = await this.prisma.user.findFirst({
        where: { email: createUserDto.email }
      })
      if(existingUser) {
        throw new BadRequestException("Email already exist");
      }
      const token = uuid();
      const user = await this.prisma.user.create({
        data: { ...createUserDto, confirmEmailToken: token }
      });
      await this.mailService.sendUserConfirmation(user, token);
      delete user.password;
      delete user.confirmEmailToken;
      delete user.passwordTokenExpiry;
      delete user.resetPasswordToken;
      return user;
    } catch (e) {
      throw new InternalServerErrorException(e)
    }
  }

  async verifyEmail(token: string) {
    try {
      let user = await this.prisma.user.findFirst({
        where: { confirmEmailToken: token }
      })
      console.log("user - ", user);
      if (user) {
        await this.prisma.user.update({
          where: { id: user.id },
          data: { confirmEmailToken: null, isActive: true }
        })
        return "Email verified successfully";
      } else {
        throw new BadRequestException("Token is invalid or expired");
      }
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException(e)
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      let user = await this.prisma.user.findFirst({
        where: { resetPasswordToken: resetPasswordDto.token }
      })
      console.log("user - ", user);
      if (user) {
        await this.prisma.user.update({
          where: { id: user.id },
          data: { resetPasswordToken: null, password: resetPasswordDto.password }
        })
        return "Password chnaged successfully";
      } else {
        throw new BadRequestException("Token is invalid or expired");
      }
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException(e)
    }
  }

  async findUser(email: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { email: email }
      })

    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException(e)
    }
  }

  async sendResetPasswordLink(email: string) {
    try {
      const token = uuid();
      const passwordTokenExpiry = new Date(Number(new Date()) + 1800000);
      const user = await this.prisma.user.findUnique({
        where: { email: email }
      })
      if (user) {
        await this.prisma.user.update({
          where: { id: user.id },
          data: { resetPasswordToken: token, passwordTokenExpiry: passwordTokenExpiry }
        })
        await this.mailService.sendUserConfirmation(user, token);
      }
      return "Password reset link sent if email exist in our system";
    } catch (e) {
      throw new InternalServerErrorException(e)
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      select: { id: true, fullName: true, email: true, dateOfBirth: true, createdAt: true }
    })
    if (!user) {
      throw new NotFoundException("User does not exist");
    }
    user['shoppingPreferences'] = await this.shoppingPrefService.findAll(id);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
