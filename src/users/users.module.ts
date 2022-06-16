import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma.module';
import { MailModule } from 'src/mail/mail.module';
import { ShoppingPrefModule } from 'src/shopping-pref/shopping-pref.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports : [PrismaModule, MailModule, ShoppingPrefModule],
  exports: [UsersService],
})
export class UsersModule {}