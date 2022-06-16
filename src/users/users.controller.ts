import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, ResetPasswordDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/signUp")
  @ApiOperation({summary : 'Create a new user'})
  @ApiBody({type : CreateUserDto})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get("/verifyEmail")
  @ApiOperation({summary : 'Verify user email'})
  @ApiQuery({name : 'token', description: "Token of email verification"})
  verifyEmail(@Query('token') token: string) {
    return this.usersService.verifyEmail(token);
  }

  @Get("/sendResetPasswordLink")
  @ApiOperation({summary : 'Send reset password link'})
  @ApiQuery({name : 'email', description: "Email to send password verification link"})
  sendResetPasswordLink(@Query('email') email: string) {
    return this.usersService.sendResetPasswordLink(email);
  }

  @Post("/resetPassword")
  @ApiOperation({summary : 'Reset Password'})
  @ApiBody({type : ResetPasswordDto})
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.usersService.resetPassword(resetPasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({summary : 'Get user details'})
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

}
