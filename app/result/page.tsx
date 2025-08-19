"use client";
import { useEffect, useMemo, useState } from "react";
import ElementBar from "../../components/ElementBar";
import { luckyFromElements } from "../../lib/saju";
type Elements = { wood: number; fire: number; earth: number; metal: number; water: number };

export default function ResultPage() {
  const [mbtiType, setMbtiType] = useState<string>("");
  const [birth, setBirth] = useState<{date:string; time:string; place:string} | null>(null);
  const [elements, setElements] = useState<Elements | null>(null);
  const [pillars, setPillars] = useState<{year:string;month:string;day:string;hour:string} | null>(null);

  useEffect(()=>{
    setMbtiType(localStorage.getItem("mbtiType") || "");
    const bd = localStorage.getItem("birthDate");
    const bt = localStorage.getItem("birthTime");
    const bp = localStorage.getItem("birthPlace");
    if (bd && bt) setBirth({date: bd, time: bt, place: bp || ""});
  }, []);

  useEffect(()=>{
    async function run(){
      if (!birth) return;
      const res = await fetch("/api/saju", { method: "POST", body: JSON.stringify(birth) });
      const data = await res.json();
      setElements(data.elements);
      setPillars(data.pillars);
    }
    run();
  }, [birth]);

  const lucky = useMemo(()=> elements ? luckyFromElements(elements) : null, [elements]);
  const premiumUnlocked = typeof window !== "undefined" && localStorage.getItem("premiumUnlocked") === "1";

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="section-title">결과 요약</div>
            <div className="small">MBTI: <span className="font-semibold text-white">{mbtiType || "—"}</span></div>
            <div className="small">출생: {birth ? `${birth.date} ${birth.time} (${birth.place||"—"})` : "—"}</div>
            {pillars && <div className="small mt-1">간지: {pillars.year} / {pillars.month} / {pillars.day} / {pillars.hour}</div>}
          </div>
          {lucky && (
            <div className="px-3 py-2 rounded-xl border border-white/10">
              <div className="small mb-1">행운 요소</div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border" style={{ background: lucky.color }} />
                <div className="text-sm">숫자 {lucky.number} · 아이템 {lucky.item}</div>
              </div>
            </div>
          )}
        </div>

        {elements ? (
          <div className="grid-2 mt-6">
            {Object.entries(elements).map(([k,v])=> (
              <ElementBar key={k} label={ko(k)} value={v as number} />
            ))}
          </div>
        ) : <p className="small mt-4">오행을 계산 중…</p>}
      </div>

      {!premiumUnlocked ? (
        <div className="card">
          <div className="section-title">프리미엄 잠금 해제</div>
          <div className="flex gap-3">
            <a href="/checkout" className="btn">결제하기(목업)</a>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="section-title">프리미엄 콘텐츠</div>
          <div className="flex gap-3">
            <a className="btn" href="/premium/pdf" target="_blank">PDF 레이아웃 열기</a>
          </div>
        </div>
      )}
    </div>
  );
}

function ko(key: string) {
  switch(key){
    case "wood": return "목";
    case "fire": return "화";
    case "earth": return "토";
    case "metal": return "금";
    case "water": return "수";
    default: return key;
  }
}
