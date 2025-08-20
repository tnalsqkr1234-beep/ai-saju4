import { NextRequest, NextResponse } from 'next/server';
import { computeSaju } from '../../../lib/saju';
export const runtime = 'nodejs';
export async function POST(req: NextRequest){ const body = await req.json(); const { date, time } = body||{}; const data = computeSaju(date??'1995-01-01', time??'12:00'); return NextResponse.json(data); }
