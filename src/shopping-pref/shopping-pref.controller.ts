import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ShoppingPrefService } from './shopping-pref.service';
import { CreateShoppingPrefDto } from './dto/create-shopping-pref.dto';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('shopping-pref')
export class ShoppingPrefController {
  constructor(private readonly shoppingPrefService: ShoppingPrefService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({summary : 'Create shopping preferences'})
  @ApiBody({type : CreateShoppingPrefDto})
  create(@Body() createShoppingPrefDto: CreateShoppingPrefDto) {
    return this.shoppingPrefService.create(createShoppingPrefDto);
  }
  
}
