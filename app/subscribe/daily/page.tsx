'use client';
import { useState } from 'react';
export default function SubscribeDaily(){
  const [form, setForm] = useState({ email:'', mbti:'', date:'1995-01-01', time:'12:00', place:'Seoul, KR', gender:'' });
  const [status, setStatus] = useState<'idle'|'loading'|'ok'|'error'>('idle');
  async function submit(e:React.FormEvent){ e.preventDefault(); setStatus('loading'); try{ const r = await fetch('/api/subscribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)}); if(!r.ok) throw 0; setStatus('ok'); } catch{ setStatus('error'); } }
  return (<div className='card'><div className='section-title'>일일 운세 구독</div>
    <form onSubmit={submit} className='space-y-4'>
      <div className='grid-2'>
        <div><label className='label'>이메일</label><input className='input' type='email' required value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/></div>
        <div><label className='label'>MBTI</label><input className='input' required placeholder='예: INFP' value={form.mbti} onChange={e=>setForm({...form, mbti:e.target.value.toUpperCase()})}/></div>
        <div><label className='label'>출생일</label><input className='input' type='date' required value={form.date} onChange={e=>setForm({...form, date:e.target.value})}/></div>
        <div><label className='label'>출생시간</label><input className='input' type='time' required value={form.time} onChange={e=>setForm({...form, time:e.target.value})}/></div>
      </div>
      <button className='btn' disabled={status==='loading'}>{status==='loading'?'구독 처리 중…':'구독 신청 & 오늘 운세 메일 받기'}</button>
      {status==='ok' && <p className='small'>신청 완료! 이메일을 확인하세요.</p>}
      {status==='error' && <p className='small'>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</p>}
    </form>
  </div>);
}
