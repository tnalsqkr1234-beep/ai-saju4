"use client";
import { useMemo, useState } from "react";
import { questions, scoreMBTI } from "@/lib/mbti";

export default function MBTIPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const done = Object.keys(answers).length === questions.length;
  const { type, scores } = useMemo(()=>scoreMBTI(answers), [answers]);

  function set(id: string, v: number) { setAnswers(p=>({...p,[id]:v})); }
  function storeAndNext() {
    localStorage.setItem("mbtiAnswers", JSON.stringify(answers));
    localStorage.setItem("mbtiType", type);
    localStorage.setItem("mbtiScores", JSON.stringify(scores));
    location.href = "/saju";
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="section-title">MBTI 퀵 테스트 (20문항)</div>
        <p className="small mb-4">각 문항 1~5 선택</p>
        <div className="space-y-4">
          {questions.map((q, idx)=>(
            <div key={q.id} className="p-4 rounded-xl bg-white/5">
              <div className="text-sm text-white mb-3">{idx+1}. {q.prompt}</div>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(v => (
                  <button key={v} className={`px-3 py-1 rounded-lg border ${answers[q.id]===v ? "bg-[var(--primary)] border-transparent" : "border-white/10"}`} onClick={()=>set(q.id, v)}>{v}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="small">예상 유형: <span className="font-semibold text-white">{type}</span></div>
          <button disabled={!done} onClick={storeAndNext} className={`btn ${!done?"opacity-50 pointer-events-none":""}`}>다음: 사주 입력</button>
        </div>
      </div>
    </div>
  );
}
