"use client";
import React, { useEffect, useState } from "react";
export default function PremiumPDF() {
  const [mbtiType, setMbtiType] = useState<string>("");
  const [elements, setElements] = useState<any>(null);
  const [pillars, setPillars] = useState<any>(null);
  useEffect(()=>{
    setMbtiType(localStorage.getItem("mbtiType")||"");
    const el = localStorage.getItem("elements");
    if (el) setElements(JSON.parse(el));
    const pl = localStorage.getItem("pillars");
    if (pl) setPillars(JSON.parse(pl));
  }, []);
  return (
    <div className="bg-white text-black min-h-screen p-8 print:p-0">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" className="h-8 w-auto" />
            <div className="text-gray-500">Premium Report</div>
          </div>
          <div className="text-sm text-gray-500">2025-08-19</div>
        </header>
        <section className="py-6">
          <h1 className="text-2xl font-bold mb-2">월간 리포트 요약</h1>
          <p className="text-gray-700">MBTI: <b>{mbtiType}</b></p>
          {pillars && <p className="text-gray-700 mt-1">간지: {pillars.year} / {pillars.month} / {pillars.day} / {pillars.hour}</p>}
          {elements && (
            <div className="grid grid-cols-5 gap-2 mt-3">
              {Object.entries(elements).map(([k,v]: any)=>(
                <div key={k} className="text-sm">
                  <div className="h-2 bg-black/10 rounded" title={k}>
                    <div className="h-2 bg-black" style={ width: v + "%" } />
                  </div>
                  <div className="text-gray-600 mt-1">{ko(k)} {String(v)}%</div>
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold">연애/대인</h3>
            <ul className="list-disc pl-5 text-gray-800 leading-7">
              <li>감정 확인 질문을 한 번 더</li><li>답장은 짧고 명확하게</li><li>저녁 약속은 1개</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">재물/일/사업</h3>
            <ul className="list-disc pl-5 text-gray-800 leading-7">
              <li>핵심 작업 2개 타임블록(50분)</li><li>불확실 업무 쪼개기</li><li>지출 메모 3줄</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">건강/에너지</h3>
            <ul className="list-disc pl-5 text-gray-800 leading-7">
              <li>물 1컵 추가</li><li>스트레칭 5분</li><li>수면 7시간</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">학업/성장</h3>
            <ul className="list-disc pl-5 text-gray-800 leading-7">
              <li>키워드 3개 기록</li><li>복습 10분</li><li>한 문장 요약</li>
            </ul>
          </div>
        </section>
        <section className="py-8 border-t">
          <p className="text-gray-500 text-sm">※ 본 리포트는 오락/참고용입니다. 중요한 결정은 전문가와 상의하세요.</p>
        </section>
      </div>
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
