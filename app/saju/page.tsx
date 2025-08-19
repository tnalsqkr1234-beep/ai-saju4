"use client";
import { useState } from "react";

export default function SajuPage() {
  const [date, setDate] = useState<string>("1995-01-01");
  const [time, setTime] = useState<string>("12:00");
  const [place, setPlace] = useState<string>("Seoul, KR");

  function storeAndNext() {
    localStorage.setItem("birthDate", date);
    localStorage.setItem("birthTime", time);
    localStorage.setItem("birthPlace", place);
    location.href = "/result";
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="section-title">사주 정보 입력</div>
        <div className="grid-2">
          <div><label className="label">출생 일자</label><input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} /></div>
          <div><label className="label">출생 시간</label><input className="input" type="time" value={time} onChange={e=>setTime(e.target.value)} /></div>
          <div className="md:col-span-2"><label className="label">출생지(선택)</label><input className="input" placeholder="Seoul, KR" value={place} onChange={e=>setPlace(e.target.value)} /></div>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={storeAndNext} className="btn">다음: 결과 보기</button>
        </div>
      </div>
    </div>
  );
}
