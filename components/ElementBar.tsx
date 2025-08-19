"use client";
import React from "react";
export default function ElementBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm subtle mb-1"><span>{label}</span><span>{value}%</span></div>
      <div className="h-2 w-full bg-white/10 rounded-lg overflow-hidden">
        <div className="h-full bg-[var(--primary)]" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
