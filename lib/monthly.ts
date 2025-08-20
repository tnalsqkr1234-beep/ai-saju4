import { computeSaju, type Elements } from './saju';
const themeByMax: Record<keyof Elements, string> = { wood:'성장·학습', fire:'표현·관계', earth:'안정·관리', metal:'정리·결단', water:'휴식·기획' };
export function monthlyReport(date:string, time:string, mbti:string, months=12){
  const list: { ym:string; theme:string; focus:string; actions:string[] }[] = [];
  const base = new Date(date + 'T' + time + ':00');
  for(let i=0;i<months;i++){
    const dt = new Date(base.getFullYear(), base.getMonth()+i, 1);
    const y = dt.getFullYear(); const m = dt.getMonth()+1; const d = 1;
    const pad = (n:number)=> String(n).padStart(2,'0');
    const ym = `${y}-${pad(m)}`;
    const saju = computeSaju(`${y}-${pad(m)}-${pad(d)}`, time);
    const maxKey = (Object.entries(saju.elements) as [keyof Elements, number][]).sort((a,b)=>b[1]-a[1])[0][0];
    const theme = themeByMax[maxKey];
    const actions = suggestActions(theme, mbti.toUpperCase());
    list.push({ ym, theme, focus: `${theme} 강화의 달`, actions });
  }
  return list;
}
function suggestActions(theme:string, mbti:string){
  const common=['상위 2개 목표 정의','50분 타임블록 2회','물 1컵·산책 15분'];
  const byTheme:Record<string,string[]>={ '성장·학습':['학습 키워드 3개 기록','주 2회 실습','주말 30분 리뷰'], '표현·관계':['피드백 1회 요청','감사의 말 1번','대화 기록 3줄'], '안정·관리':['정리 20분','지출 메모','수면 7시간'], '정리·결단':['불필요 1개 제거','아젠다 3줄','다음 행동 1개'], '휴식·기획':['스루풋 낮추기','다음 달 초안','산책 루틴'] };
  const axis:any = { I:'깊은 몰입 30분', E:'대면 10분 브리핑', S:'증거 3개 확인', N:'아이디어 초안', T:'원칙 2줄', F:'관계 배려 1회', J:'체크리스트 3개', P:'버퍼 30%' };
  const mb = [axis[mbti[0]], axis[mbti[1]], axis[mbti[2]], axis[mbti[3]]];
  return [...byTheme[theme], ...mb, ...common];
}
