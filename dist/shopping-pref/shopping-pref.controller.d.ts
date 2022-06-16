import { ShoppingPrefService } from './shopping-pref.service';
import { CreateShoppingPrefDto } from './dto/create-shopping-pref.dto';
export declare class ShoppingPrefController {
    private readonly shoppingPrefService;
    constructor(shoppingPrefService: ShoppingPrefService);
    create(createShoppingPrefDto: CreateShoppingPrefDto): Promise<import(".prisma/client").ShoppingPref>;
}
