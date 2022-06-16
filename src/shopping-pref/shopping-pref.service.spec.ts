import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingPrefService } from './shopping-pref.service';

describe('ShoppingPrefService', () => {
  let service: ShoppingPrefService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingPrefService],
    }).compile();

    service = module.get<ShoppingPrefService>(ShoppingPrefService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
