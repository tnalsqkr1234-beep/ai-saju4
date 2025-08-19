"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function CheckoutPage() {
  const r = useRouter();
  const [status, setStatus] = useState<string>("ready");
  function success(){ localStorage.setItem("premiumUnlocked","1"); setStatus("success"); setTimeout(()=>r.push("/result"),700); }
  function fail(){ localStorage.removeItem("premiumUnlocked"); setStatus("fail"); }
  return (
    <div className="card">
      <div className="section-title">결제 목업</div>
      <p className="small mb-4">포트원/토스/카카오 연동 전, 시나리오 테스트입니다.</p>
      <div className="flex gap-3">
        <button onClick={success} className="btn">결제 성공</button>
        <button onClick={fail} className="btn bg-white/10">결제 실패</button>
      </div>
      {status!=="ready" && <p className="small mt-4">상태: <b>{status}</b></p>}
    </div>
  );
}
