"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="card">
        <motion.h1 initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="text-2xl font-bold mb-2">
          성향과 기운을 한 번에 — AI 사주 + MBTI (만세력)
        </motion.h1>
        <p className="subtle mb-6">실제 간지/오행 계산과 MBTI 결과를 함께 제공합니다.</p>
        <div className="flex gap-3">
          <Link href="/mbti" className="btn">시작하기</Link>
          <Link href="/saju" className="btn bg-white/10">사주만 입력</Link>
        </div>
      </div>
      <div className="grid-3">
        {[["실제 만세력","연·월·일·시 간지 계산"],["이중 진단","MBTI+오행 인사이트"],["프리미엄","PDF 레이아웃"]].map(([t,s],i)=>(
          <div className="card" key={i}>
            <div className="badge mb-2">{t}</div>
            <div className="text-lg font-semibold mb-1">{t}</div>
            <div className="small">{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
