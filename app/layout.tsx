import "./globals.css";
import { ReactNode } from "react";

export const metadata = { title: "AI 사주+MBTI (만세력)", description: "실제 간지/오행 계산" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <header className="border-b border-white/5">
          <div className="container-max flex items-center gap-3 py-4">
            <img src="/logo.svg" alt="logo" className="h-6 w-auto" />
            <span className="subtle">실제 만세력 기반</span>
          </div>
        </header>
        <main className="container-max py-8">{children}</main>
        <footer className="container-max py-12 subtle text-sm">
          © {new Date().getFullYear()} SAJU+MBTI — 오락/참고용. 중요한 결정은 전문가와 상의하세요.
        </footer>
      </body>
    </html>
  );
}
