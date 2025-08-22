import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function getKV() {
  try {
    const mod = await import('@vercel/kv');
    return mod.kv;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  if (!email) return NextResponse.json({ ok: false, error: 'missing email' }, { status: 400 });

  const kv = await getKV();
  if (!kv) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  await kv.srem('subs', email);
  await kv.del(`sub:${email}`);
  return NextResponse.json({ ok: true });
}
