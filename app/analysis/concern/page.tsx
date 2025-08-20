'use client';
import { useState } from 'react';
export default function ConcernPage(){
  const [form, setForm] = useState({ topic:'연애', text:'', mbti:'', date:'1995-01-01', time:'12:00' });
  const [res, setRes] = useState<any>(null);
  async function submit(e:React.FormEvent){ e.preventDefault(); const r = await fetch('/api/analysis/concern',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)}); setRes(await r.json()); }
  return (<div className='space-y-6'>
    <div className='card'>
      <div className='section-title'>건당 분석</div>
      <form onSubmit={submit} className='space-y-3'>
        <div className='grid-2'>
          <div><label className='label'>주제</label><input className='input' value={form.topic} onChange={e=>setForm({...form, topic:e.target.value})}/></div>
          <div><label className='label'>MBTI</label><input className='input' value={form.mbti} onChange={e=>setForm({...form, mbti:e.target.value.toUpperCase()})}/></div>
          <div><label className='label'>출생일</label><input className='input' type='date' value={form.date} onChange={e=>setForm({...form, date:e.target.value})}/></div>
          <div><label className='label'>출생시간</label><input className='input' type='time' value={form.time} onChange={e=>setForm({...form, time:e.target.value})}/></div>
        </div>
        <div><label className='label'>상세(선택)</label><textarea className='input' rows={5} placeholder='배경/상세를 적어주세요' value={form.text} onChange={e=>setForm({...form, text:e.target.value})}/></div>
        <button className='btn'>분석 보기</button>
      </form>
    </div>
    {res && <div className='card'>
      <div className='section-title'>결과</div>
      <p className='small mb-2'>간지: {res.pillars.year} / {res.pillars.month} / {res.pillars.day} / {res.pillars.hour}</p>
      <ul className='small' style={{marginLeft:'1.25rem', listStyle:'disc'}}>
        <li>{res.summary}</li>
        {res.guidance.map((g:string,i:number)=>(<li key={i}>{g}</li>))}
      </ul>
      <div className='mt-3 small'>다음 행동</div>
      <ul className='small' style={{marginLeft:'1.25rem', listStyle:'disc'}}>
        {res.nextSteps.map((t:string,i:number)=>(<li key={i}>{t}</li>))}
      </ul>
    </div>}
  </div>);
}
