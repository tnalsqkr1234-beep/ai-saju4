import type { Elements } from './saju';
const order = ['wood','fire','earth','metal','water'] as const;
const nextMap: Record<string,string> = { wood:'fire', fire:'earth', earth:'metal', metal:'water', water:'wood' };
const counterMap: Record<string,string> = { wood:'earth', earth:'water', water:'fire', fire:'metal', metal:'wood' };
export function sajuPairScore(a: Elements, b: Elements){ let score=0; for(const el of order){ const nourish=nextMap[el]; // @ts-ignore
  score += 0.5*Math.min(a[el], b[nourish]); // @ts-ignore
  score += 0.5*Math.min(b[el], a[nourish]); const conflict=counterMap[el]; // @ts-ignore
  score -= 0.6*Math.min(a[el], b[conflict]); // @ts-ignore
  score -= 0.6*Math.min(b[el], a[conflict]); } const variance=(v:Elements)=>{ const s=[v.wood,v.fire,v.earth,v.metal,v.water]; const avg=s.reduce((p,c)=>p+c,0)/5; return s.reduce((p,c)=>p+(c-avg)*(c-avg),0)/5; }; const bal=Math.max(0,50-(variance(a)+variance(b))/2); score+=bal*0.3; return Math.max(0,Math.min(100,Math.round(score/1.8))); }
export function mbtiPairScore(a:string,b:string){ a=(a||'INTJ').toUpperCase(); b=(b||'INTJ').toUpperCase(); const axes=[0,1,2,3].map(i=>a[i]===b[i]?25:15); let score=axes.reduce((p,c)=>p+c,0); if('NT'.includes(a[1]) && 'NT'.includes(b[1])) score+=5; if('SF'.includes(a[1]) && 'SF'.includes(b[1])) score+=5; return Math.max(0,Math.min(100,score)); }
export function combineCompatScore(s:number,m:number){ return Math.round(s*0.6 + m*0.4); }
export function compatNarrative({sajuScore, mbtiScore, total}:{sajuScore:number;mbtiScore:number;total:number}){ const lanes=[[ '소통', total>70? '자연스럽게 합의점에 도달':'의도를 먼저 확인하며 속도를 맞추기'],[ '가치/판단', sajuScore>mbtiScore? '원칙과 역할 정리가 갈등을 낮춤':'감정·관계 신호에 주의'],[ '생활리듬', total>60? '루틴 공유가 시너지를 냄':'일정은 최소 단위로 공유'],[ '갈등해결', mbtiScore>70? '상호 피드백 루프가 잘 작동':'사전 합의된 2단계 프로토콜 필요'],[ '성장/학습', total>75? '공동 학습 프로젝트에 적합':'개별 학습 후 공유가 효율적'],[ '장기전략', sajuScore>65? '중장기 계획을 세우고 점검':'분기별 점검으로 방향성 보정'],[ '케미한줄', total>80? '함께 있을 때 서로를 더 좋은 버전으로 만듭니다':'속도보다 온도가 중요합니다']]; return lanes.map(([k,v])=>({title:k as string, text:v as string})); }
