import { computeSaju } from './saju';
export function analyzeConcern(opts:{ topic?:string; text?:string; date:string; time:string; mbti:string }){
  const { topic='고민', text='', date, time, mbti } = opts;
  const s=computeSaju(date,time);
  const entries = Object.entries(s.elements) as any[];
  const max = entries.sort((a,b)=>b[1]-a[1])[0][0];
  const min = entries.sort((a,b)=>a[1]-b[1])[0][0];
  const summary = `${topic}에 대한 핵심은 '${ko(max)}의 강점'을 살리되 '${ko(min)}의 보완'입니다.`;
  const steps=['문제 정의를 2문장으로 정리','가정·사실 분리','다음 행동 1개 선택'];
  const comm = mbti.startsWith('I') ? '짧고 명확한 서면 커뮤니케이션' : '먼저 질문 2개 던지기';
  return { pillars:s.pillars, elements:s.elements, summary, guidance:[`MBTI(${mbti.toUpperCase()}) 기반 소통 제안: ${comm}`, `강점(${ko(max)})을 쓰되 과함을 경계, 약점(${ko(min)})은 루틴으로 보완`], nextSteps: steps };
}
function ko(k:string){ return k==='wood'?'목':k==='fire'?'화':k==='earth'?'토':k==='metal'?'금':'수'; }
