import { NextRequest, NextResponse } from 'next/server';
import { analyzeConcern } from '../../../../lib/analysis';
export const runtime = 'nodejs';
export async function POST(req:NextRequest){ const body = await req.json(); const { topic, text, date, time, mbti } = body||{}; const result = analyzeConcern({ topic, text, date, time, mbti:(mbti||'INTJ').toUpperCase() }); return NextResponse.json(result); }
