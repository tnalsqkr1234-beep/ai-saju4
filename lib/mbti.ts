export type MBTIScores = { IE: number; SN: number; TF: number; JP: number };
export type MBTIType = `${'I'|'E'}${'S'|'N'}${'T'|'F'}${'J'|'P'}`;
export const questions = [
  { id: 'IE1', axis:'IE', prompt:'사람 많은 모임보다 혼자 시간을 보낼 때 더 에너지가 채워진다.' },
  { id: 'IE2', axis:'IE', prompt:'새로운 사람을 만나도 쉽게 대화를 시작한다.', reverse:true },
  { id: 'IE3', axis:'IE', prompt:'주말 일정은 조용히 쉬는 편이 좋다.' },
  { id: 'IE4', axis:'IE', prompt:'큰 파티보다 소수의 친한 사람과의 만남이 편하다.' },
  { id: 'IE5', axis:'IE', prompt:'지인 소개 모임에서 에너지가 오른다.', reverse:true },
  { id: 'SN1', axis:'SN', prompt:'사실·데이터 같은 구체적인 정보가 더 편하다.' },
  { id: 'SN2', axis:'SN', prompt:'아이디어·가능성보다 현재에 집중한다.' },
  { id: 'SN3', axis:'SN', prompt:'미래의 추측보다 눈앞의 증거를 중시한다.' },
  { id: 'SN4', axis:'SN', prompt:'추상적인 개념 토론이 더 즐겁다.', reverse:true },
  { id: 'SN5', axis:'SN', prompt:'새로운 가능성을 상상하는 편이다.', reverse:true },
  { id: 'TF1', axis:'TF', prompt:'결정은 원칙과 논리가 우선이다.' },
  { id: 'TF2', axis:'TF', prompt:'의사결정에서 사람의 감정을 더 고려한다.', reverse:true },
  { id: 'TF3', axis:'TF', prompt:'직설적 피드백이 더 도움이 된다.' },
  { id: 'TF4', axis:'TF', prompt:'갈등 상황에서 관계 유지를 우선한다.', reverse:true },
  { id: 'TF5', axis:'TF', prompt:'사실 기반 토론이 감정적 공감보다 편하다.' },
  { id: 'JP1', axis:'JP', prompt:'마감이 있는 계획을 선호한다.' },
  { id: 'JP2', axis:'JP', prompt:'상황에 따라 유연하게 바꾸는 편이다.', reverse:true },
  { id: 'JP3', axis:'JP', prompt:'정리된 체크리스트를 좋아한다.' },
  { id: 'JP4', axis:'JP', prompt:'즉흥적 선택이 더 즐겁다.', reverse:true },
  { id: 'JP5', axis:'JP', prompt:'일정과 규칙이 있어야 마음이 편하다.' }
] as const;
export function scoreMBTI(answers: Record<string, number>){
  const init: MBTIScores = { IE:0, SN:0, TF:0, JP:0 };
  for(const q of questions as any){
    const raw = answers[q.id] ?? 3;
    const val = (q.reverse ? (6-raw) : raw) - 3;
    // @ts-ignore
    init[q.axis] += val;
  }
  const type = `${init.IE>=0?'E':'I'}${init.SN>=0?'S':'N'}${init.TF>=0?'T':'F'}${init.JP>=0?'J':'P'}` as MBTIType;
  return { scores:init, type };
}
