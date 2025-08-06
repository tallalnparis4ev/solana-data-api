// apps/web/app/api/solana/transaction-count/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const block = searchParams.get('block');

  if (!block) {
    return NextResponse.json({ error: 'Missing block parameter' }, { status: 400 });
  }

  try {
    const apiRes = await fetch(`http://localhost:3000/solana/transaction-count?block=${block}`);
    const data = await apiRes.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Proxy error', details: String(err) }, { status: 500 });
  }
}
