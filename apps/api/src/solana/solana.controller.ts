import { Controller, Get, Query } from '@nestjs/common';
import { SolanaService } from './solana.service';

@Controller('solana')
export class SolanaController {
  constructor(private readonly solanaService: SolanaService) {}

  @Get('transaction-count')
  async getTransactionCount(@Query('block') block: string) {
    const count = await this.solanaService.getTransactionCountByBlock(Number(block));
    return { block: Number(block), transactionCount: count };
  }
}
