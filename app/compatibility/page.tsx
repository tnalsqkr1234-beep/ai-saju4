'use client';
import { useState } from 'react';
export default function CompatibilityPage(){
  const [A, setA] = useState({ mbti:'', date:'1995-01-01', time:'12:00' });
  const [B, setB] = useState({ mbti:'', date:'1995-01-01', time:'12:00' });
  const [res, setRes] = useState<any>(null);
  async function submit(e:React.FormEvent){ e.preventDefault(); const r = await fetch('/api/compatibility',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({A,B})}); setRes(await r.json()); }
  return (<div className='space-y-6'>
    <div className='card'>
      <div className='section-title'>궁합 (사주+MBTI)</div>
      <form onSubmit={submit} className='grid-2'>
        <div>
          <div className='small mb-2'>A 정보</div>
          <label className='label'>MBTI</label><input className='input' placeholder='예: ENTP' value={A.mbti} onChange={e=>setA({...A, mbti:e.target.value.toUpperCase()})}/>
          <label className='label'>출생일</label><input className='input' type='date' value={A.date} onChange={e=>setA({...A, date:e.target.value})}/>
          <label className='label'>출생시간</label><input className='input' type='time' value={A.time} onChange={e=>setA({...A, time:e.target.value})}/>
        </div>
        <div>
          <div className='small mb-2'>B 정보</div>
          <label className='label'>MBTI</label><input className='input' placeholder='예: ISFJ' value={B.mbti} onChange={e=>setB({...B, mbti:e.target.value.toUpperCase()})}/>
          <label className='label'>출생일</label><input className='input' type='date' value={B.date} onChange={e=>setB({...B, date:e.target.value})}/>
          <label className='label'>출생시간</label><input className='input' type='time' value={B.time} onChange={e=>setB({...B, time:e.target.value})}/>
        </div>
        <div className='md:col-span-2'><button className='btn'>궁합 보기</button></div>
      </form>
    </div>
    {res && <div className='card'>
      <div className='section-title'>결과</div>
      <p className='small mb-2'>총점: <b>{res.total}</b> / 사주: {res.sajuScore} · MBTI: {res.mbtiScore}</p>
      <div className='grid-2'>{res.lanes?.map((l:any,i:number)=>(<div key={i} className='p-3 rounded-xl' style={{background:'rgba(255,255,255,.05)'}}><div className='text-sm text-white font-semibold mb-1'>{l.title}</div><div className='small'>{l.text}</div></div>))}</div>
    </div>}
  </div>);
}
