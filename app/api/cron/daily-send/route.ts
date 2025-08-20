import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { sendFortuneEmail } from '../../../../lib/email';
import { computeSaju } from '../../../../lib/saju';
import { composeDaily } from '../../../../lib/fortune';
import { renderDailyHTML } from '../../../../lib/html';
export const runtime = 'nodejs';
export async function GET(req:NextRequest){
  const emails = await kv.smembers<string>('subs');
  let sent=0;
  for(const email of emails){
    const data = await kv.hgetall<{email:string; mbti:string; date:string; time:string; place?:string; gender?:string}>(`sub:${email}`);
    if(!data) continue;
    const saju = computeSaju(data.date, data.time);
    const daily = composeDaily(saju.pillars, saju.elements, data.mbti);
    const html = renderDailyHTML({ email, mbti:data.mbti, pillars:saju.pillars, coach:daily.coach, todos:daily.todos });
    await sendFortuneEmail(email, '오늘의 운세 ✨', html);
    sent++;
  }
  return NextResponse.json({ ok:true, count: sent });
}
