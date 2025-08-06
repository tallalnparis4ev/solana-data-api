import { Injectable } from '@nestjs/common';
import { Connection } from '@solana/web3.js';

@Injectable()
export class SolanaService {
  private connection = new Connection('https://api.mainnet-beta.solana.com');

  async getTransactionCountByBlock(blockNumber: number): Promise<number> {
    const maxRetries = 10;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const block = await this.connection.getBlock(blockNumber, {
          maxSupportedTransactionVersion: 0,
        });
        return block?.transactions?.length || 0;
      } catch (err) {
        attempt++;
        console.warn(
          `Attempt ${attempt} failed to fetch block ${blockNumber}. Retrying in 2 seconds...`
        );

        if (attempt >= maxRetries) {
          console.error(err);
          throw new Error(`Failed to fetch block ${blockNumber} after ${maxRetries} attempts.`);
        }

        await this.sleep(2000); // Wait 2 seconds
      }
    }

    return 0; // Should never reach here
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
