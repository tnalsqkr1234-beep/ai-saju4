import { NextRequest, NextResponse } from 'next/server';
import { monthlyReport } from '../../../../lib/monthly';
export const runtime = 'nodejs';
export async function POST(req:NextRequest){ const body = await req.json(); const { date, time, mbti, months } = body||{}; const list = monthlyReport(date??'1995-01-01', time??'12:00', (mbti||'INTJ').toUpperCase(), Math.min(Math.max(Number(months||12),1),24)); return NextResponse.json({ list }); }
