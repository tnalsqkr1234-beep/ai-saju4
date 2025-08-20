import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
export const runtime = 'nodejs';
export async function GET(req:NextRequest){ const { searchParams } = new URL(req.url); const email = searchParams.get('email'); if(!email) return NextResponse.json({ ok:false, error:'missing email' }, { status:400 }); await kv.srem('subs', email); await kv.del(`sub:${email}`); return NextResponse.json({ ok:true }); }
