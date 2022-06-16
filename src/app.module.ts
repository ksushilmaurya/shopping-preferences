import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ShoppingPrefModule } from './shopping-pref/shopping-pref.module';
import { PrismaService } from './prisma.service';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, UsersModule, ShoppingPrefModule, MailModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
