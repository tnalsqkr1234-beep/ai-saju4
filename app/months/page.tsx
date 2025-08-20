'use client';
import { useState } from 'react';
export default function MonthsPage(){
  const [form, setForm] = useState({ mbti:'', date:'1995-01-01', time:'12:00', months:12 });
  const [res, setRes] = useState<any[]>([]);
  async function submit(e:React.FormEvent){ e.preventDefault(); const r = await fetch('/api/fortune/monthly',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)}); const data = await r.json(); setRes(data.list||[]); }
  return (<div className='space-y-6'>
    <div className='card'>
      <div className='section-title'>월별 리포트(12개월)</div>
      <form onSubmit={submit} className='grid-2'>
        <div><label className='label'>MBTI</label><input className='input' value={form.mbti} onChange={e=>setForm({...form, mbti:e.target.value.toUpperCase()})}/></div>
        <div><label className='label'>출생일</label><input className='input' type='date' value={form.date} onChange={e=>setForm({...form, date:e.target.value})}/></div>
        <div><label className='label'>출생시간</label><input className='input' type='time' value={form.time} onChange={e=>setForm({...form, time:e.target.value})}/></div>
        <div><label className='label'>개월수</label><input className='input' type='number' min={1} max={24} value={form.months} onChange={e=>setForm({...form, months:Number(e.target.value)})}/></div>
        <div className='md:col-span-2'><button className='btn'>리포트 생성</button></div>
      </form>
    </div>
    {res.length>0 && <div className='card'>
      <table className='table'><thead><tr><th>월</th><th>테마</th><th>포커스</th><th>액션</th></tr></thead><tbody>
        {res.map((row:any,i:number)=>(<tr key={i}><td>{row.ym}</td><td>{row.theme}</td><td>{row.focus}</td><td>{row.actions.slice(0,4).join(' · ')}</td></tr>))}
      </tbody></table>
    </div>}
  </div>);
}
