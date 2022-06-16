import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingPrefDto } from './create-shopping-pref.dto';

export class UpdateShoppingPrefDto extends PartialType(CreateShoppingPrefDto) {}
