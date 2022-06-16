import { Module } from '@nestjs/common';
import { ShoppingPrefService } from './shopping-pref.service';
import { ShoppingPrefController } from './shopping-pref.controller';
import { PrismaModule } from 'src/prisma.module';

@Module({
  controllers: [ShoppingPrefController],
  providers: [ShoppingPrefService],
  imports: [PrismaModule],
  exports: [ShoppingPrefService]
})
export class ShoppingPrefModule {}
