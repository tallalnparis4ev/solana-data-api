'use client'

import { useState } from 'react'

export default function Home() {
  const [block, setBlock] = useState('')
  const [result, setResult] = useState<any>(null)

  const fetchCount = async () => {
    const res = await fetch(
      `https://orange-space-winner-64wgxw6w5p4frrp4-3000.app.github.dev/solana/transaction-count?block=${block}`
);
    const data = await res.json()
    setResult(data)
  }

  return (
    <main>
      <input
        type="number"
        placeholder="Block number"
        value={block}
        onChange={(e) => setBlock(e.target.value)}
      />
      <button onClick={fetchCount}>Get Transaction Count</button>
      {result && (
        <div>
          <p>Block: {result.block}</p>
          <p>Transaction Count: {result.transactionCount}</p>
        </div>
      )}
    </main>
  )
}
