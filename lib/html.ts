export function renderDailyHTML(opts: { email:string; mbti:string; pillars:{year:string;month:string;day:string;hour:string}; coach:string[]; todos:string[]; }){
  const { email, mbti, pillars, coach, todos } = opts;
  const base = process.env.APP_BASE_URL || '';
  const unsub = base ? `${base}/api/unsubscribe?email=${encodeURIComponent(email)}` : '';
  return `<div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica Neue,Arial;">
    <h2>오늘의 운세 · ${mbti}</h2>
    <p style="color:#666">간지: ${pillars.year} / ${pillars.month} / ${pillars.day} / ${pillars.hour}</p>
    <ol>${coach.map(c=>`<li>${c}</li>`).join('')}</ol>
    <p><b>오늘의 할 일</b></p>
    <ul>${todos.map(t=>`<li>${t}</li>`).join('')}</ul>
    <p style="color:#999;font-size:12px">구독 변경은 이 메일에 회신하시거나${unsub?` <a href='${unsub}'>여기</a>에서 해지`:' 앱에서 해지'}하실 수 있어요.</p>
  </div>`;
}
