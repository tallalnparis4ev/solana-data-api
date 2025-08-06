import { Module } from '@nestjs/common';
import { SolanaService } from './solana/solana.service';
import { SolanaController } from './solana/solana.controller';

@Module({
  controllers: [SolanaController],
  providers: [SolanaService],
})
export class AppModule {}
