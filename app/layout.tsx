import './globals.css';
export const metadata = { title: 'AI 사주+MBTI', description: '일일 구독 · 궁합 · 건당분석 · 월별 리포트' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang='ko'><body>
    <header className='border-b border-white/5'>
      <div className='container-max flex items-center gap-3 py-4'>
        <span className='small px-2 py-1 rounded bg-white/10'>무료 베타</span>
        <img src='/logo.svg' alt='logo' className='h-6 w-auto' />
        <nav className='ml-auto flex gap-3 text-sm'>
          <a href='/subscribe/daily' className='small hover:underline'>일일구독</a>
          <a href='/compatibility' className='small hover:underline'>궁합</a>
          <a href='/analysis/concern' className='small hover:underline'>건당분석</a>
          <a href='/months' className='small hover:underline'>월별리포트</a>
          <a href='/mbti' className='small hover:underline'>MBTI</a>
          <a href='/legal/terms' className='small hover:underline'>이용약관</a>
          <a href='/legal/privacy' className='small hover:underline'>개인정보</a>
        </nav>
      </div>
    </header>
    <main className='container-max py-8'>{children}</main>
    <footer className='container-max py-12 subtle text-sm'>© {new Date().getFullYear()} SAJU+MBTI — 오락/참고용.</footer>
  </body></html>);
}
