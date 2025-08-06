import { Test, TestingModule } from '@nestjs/testing';
import { SolanaController } from './solana.controller';
import { SolanaService } from './solana.service';

describe('SolanaController', () => {
  let controller: SolanaController;
  let service: SolanaService;

  beforeEach(async () => {
    const mockService = {
      getTransactionCountByBlock: jest.fn().mockResolvedValue(42),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolanaController],
      providers: [{ provide: SolanaService, useValue: mockService }],
    }).compile();

    controller = module.get<SolanaController>(SolanaController);
    service = module.get<SolanaService>(SolanaService);
  });

  it('should return expected format', async () => {
    const result = await controller.getTransactionCount('123456');
    expect(result).toEqual({ block: 123456, transactionCount: 42 });
    expect(typeof result.transactionCount).toBe('number');
  });
});
