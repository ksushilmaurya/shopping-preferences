import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `${process.env.CONFIRM_TOKEN_PATH}?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Shopping App! Confirm your Email',
      template: __dirname + './templates/confirmation.hbs', 
      context: { 
        name: user.fullName,
        url,
      },
    });
  }

  async sendResetPasswordLink(user: User, token: string) {
    const url = `${process.env.RESET_PASSWORD_TOKEN_PATH}?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Shopping App! Reset Your Password',
      template: __dirname + './templates/reset.hbs', 
      context: { 
        name: user.fullName,
        url,
      },
    });
  }
}