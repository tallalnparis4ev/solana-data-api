import { Injectable } from '@nestjs/common';
import { Connection } from '@solana/web3.js';

@Injectable()
export class SolanaService {
  private connection = new Connection('https://api.mainnet-beta.solana.com');

  
  async getTransactionCountByBlock(blockNumber: number): Promise<number> {
  try {
    const block = await this.connection.getBlock(blockNumber, { maxSupportedTransactionVersion: 0 });
    return block?.transactions?.length || 0;
  } catch (err) {
    console.error(err);
    throw new Error(`Block ${blockNumber} not available. Try a more recent slot.`);
  }
}
}
