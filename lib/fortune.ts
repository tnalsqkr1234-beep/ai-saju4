import type { Elements, Pillars } from '../lib/saju';
export function composeDaily(pillars: Pillars, elements: Elements, mbti: string) {
  const entries = Object.entries(elements) as [keyof Elements, number][];
  const max = entries.sort((a,b)=>b[1]-a[1])[0][0];
  const min = entries.sort((a,b)=>a[1]-b[1])[0][0];
  const axis:any = { I:'조용한 몰입과 경계', E:'짧은 대면 소통', S:'현재 데이터 점검', N:'새 아이디어 시도', T:'원칙 정리', F:'관계 배려', J:'체크리스트', P:'유연한 버퍼' };
  const coach = [
    `오행 포커스: 강 ${ko(max)} / 약 ${ko(min)} — 강한 쪽 과함 주의, 약한 쪽 보완 루틴 추가.`,
    `MBTI 코칭: ${axis[mbti[0]]}, ${axis[mbti[1]]}, ${axis[mbti[2]]}, ${axis[mbti[3]]}.`,
    `커뮤니케이션: ${mbti.startsWith('I') ? '의견을 2줄로 또렷하게' : '질문을 2개 먼저 던지기'}.`,
    `실행: 오늘의 상위 2개 작업에 50분 타임블록.`];
  const todos = ['물 1컵','산책 15분','지출 메모 3줄'];
  return { summary: `${pillars.year}/${pillars.month}/${pillars.day}/${pillars.hour}`, coach, todos };
}
function ko(k: keyof Elements){ return k==='wood'?'목':k==='fire'?'화':k==='earth'?'토':k==='metal'?'금':'수'; }
