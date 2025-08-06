import { Connection, clusterApiUrl } from "@solana/web3.js"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(
  request: Request,
  { params }: { params: { blockNumber: string } }
) {
  const blockNumber = parseInt(params.blockNumber, 10)

  if (isNaN(blockNumber)) {
    return NextResponse.json({ error: "Invalid block number provided." }, { status: 400 })
  }

  try {
    // Establish connection to the Solana mainnet
    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed")
    
    // Fetch the block details. 
    // The `maxSupportedTransactionVersion` option is required for parsing modern transactions.
    const block = await connection.getBlock(blockNumber, { maxSupportedTransactionVersion: 0 })

    if (!block) {
      return NextResponse.json({ error: `Block #${blockNumber} not found.` }, { status: 404 })
    }

    // Return the number of transactions in the block
    return NextResponse.json({ transactionCount: block.transactions.length })
  } catch (error) {
    console.error(`Failed to fetch data for block ${blockNumber}:`, error)
    return NextResponse.json({ error: "An error occurred while fetching data from the Solana network." }, { status: 500 })
  }
}
