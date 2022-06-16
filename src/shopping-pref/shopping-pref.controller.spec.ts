import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingPrefController } from './shopping-pref.controller';
import { ShoppingPrefService } from './shopping-pref.service';

describe('ShoppingPrefController', () => {
  let controller: ShoppingPrefController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingPrefController],
      providers: [ShoppingPrefService],
    }).compile();

    controller = module.get<ShoppingPrefController>(ShoppingPrefController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
