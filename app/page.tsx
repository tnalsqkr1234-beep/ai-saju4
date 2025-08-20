'use client';
import Link from 'next/link';
export default function Home(){
  return (<div className='space-y-8'>
    <div className='card'>
      <h1 className='text-2xl font-bold mb-2'>성향과 기운을 한 번에 — AI 사주 + MBTI</h1>
      <p className='subtle mb-6'>일일 구독, 궁합, 건당 분석, 월별 리포트를 지금 바로.</p>
      <div className='flex gap-3 flex-wrap'>
        <Link href='/subscribe/daily' className='btn'>일일 운세 구독</Link>
        <Link href='/compatibility' className='btn' style={{background:'rgba(255,255,255,.1)'}}>궁합 보기</Link>
        <Link href='/analysis/concern' className='btn' style={{background:'rgba(255,255,255,.1)'}}>건당 분석</Link>
        <Link href='/months' className='btn' style={{background:'rgba(255,255,255,.1)'}}>월별 리포트</Link>
      </div>
    </div>
  </div>);
}
