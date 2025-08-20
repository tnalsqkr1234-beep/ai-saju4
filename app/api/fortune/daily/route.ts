import { NextRequest, NextResponse } from 'next/server';
import { computeSaju } from '../../../../lib/saju';
import { composeDaily } from '../../../../lib/fortune';
export const runtime = 'nodejs';
export async function POST(req: NextRequest){ const body = await req.json(); const { date, time, mbti } = body||{}; const saju = computeSaju(date??'1995-01-01', time??'12:00'); const composed = composeDaily(saju.pillars, saju.elements, (mbti||'INTJ').toUpperCase()); return NextResponse.json({ ...saju, daily: composed }); }
