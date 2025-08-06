"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TransactionCountResponse {
  transactionCount: number;
}

interface ErrorResponse {
  error: string;
}

export default function SolanaBlockExplorer() {
  const [blockNumber, setBlockNumber] = useState<string>("")
  const [result, setResult] = useState<TransactionCountResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!blockNumber) {
      setError("Please enter a block number.")
      return
    }

    setIsLoading(true)
    setResult(null)
    setError(null)

    try {
      const response = await fetch(`/api/solana/block/${blockNumber}/transaction-count`)
      const data: TransactionCountResponse | ErrorResponse = await response.json()

      if (!response.ok) {
        throw new Error((data as ErrorResponse).error || "An unknown error occurred.")
      }
      
      setResult(data as TransactionCountResponse)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Solana Block Explorer</CardTitle>
          <CardDescription>Enter a block number to get the transaction count.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="block-number">Block Number</Label>
              <Input
                id="block-number"
                type="number"
                placeholder="e.g., 268385300"
                value={blockNumber}
                onChange={(e) => setBlockNumber(e.target.value)}
                required
              />
            </div>
            {result && (
              <div className="p-4 rounded-md bg-muted">
                <p className="text-sm font-medium">
                  Transaction Count: <span className="font-bold text-lg">{result.transactionCount}</span>
                </p>
              </div>
            )}
            {error && (
                <div className="p-3 rounded-md bg-destructive/20 text-destructive">
                    <p className="text-sm font-medium">{error}</p>
                </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : "Get Transaction Count"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
