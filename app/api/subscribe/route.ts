import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { sendFortuneEmail } from '../../../lib/email';
import { computeSaju } from '../../../lib/saju';
import { composeDaily } from '../../../lib/fortune';
import { renderDailyHTML } from '../../../lib/html';
export const runtime = 'nodejs';
export async function POST(req:NextRequest){
  try{
    const { email, mbti, date, time, place, gender } = await req.json();
    if(!email || !mbti || !date || !time) return NextResponse.json({ error:'missing fields' }, { status:400 });
    await kv.sadd('subs', email);
    await kv.hset(`sub:${email}`, { email, mbti:String(mbti).toUpperCase(), date, time, place, gender, createdAt:new Date().toISOString() });
    const saju = computeSaju(date, time);
    const daily = composeDaily(saju.pillars, saju.elements, String(mbti).toUpperCase());
    const html = renderDailyHTML({ email, mbti:String(mbti).toUpperCase(), pillars:saju.pillars, coach:daily.coach, todos:daily.todos });
    await sendFortuneEmail(email, '오늘의 운세가 도착했어요 ✨', html);
    return NextResponse.json({ ok:true });
  }catch(e:any){ return NextResponse.json({ error:e?.message||'error' }, { status:500 }); }
}
