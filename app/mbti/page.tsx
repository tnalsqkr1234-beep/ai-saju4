'use client';
import { useState, useMemo } from 'react';
import { questions, scoreMBTI } from '../../lib/mbti';
export default function MBTIPage(){
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const done = Object.keys(answers).length === (questions as any).length;
  const { type } = useMemo(()=>scoreMBTI(answers), [answers]);
  return (<div className='card'><div className='section-title'>MBTI 퀵 테스트 (20문항)</div>
    <div className='space-y-4'>
      {(questions as any).map((q:any,i:number)=>(<div key={q.id} className='p-4 rounded-xl' style={{background:'rgba(255,255,255,.05)'}}>
        <div className='text-sm text-white mb-3'>{i+1}. {q.prompt}</div>
        <div className='flex gap-2'>{[1,2,3,4,5].map(v=>(<button key={v} className={`px-3 py-1 rounded-lg border ${answers[q.id]===v?'bg-[var(--primary)] border-transparent':'border-white/10'}`} onClick={()=>setAnswers(p=>({...p,[q.id]:v}))}>{v}</button>))}</div>
      </div>))}
    </div>
    <div className='flex justify-between items-center mt-6'>
      <div className='small'>예상 유형: <b className='text-white'>{type}</b></div>
      {!done && <div className='small'>※ 모든 문항에 응답하면 더 정확해요</div>}
    </div>
  </div>);
}
