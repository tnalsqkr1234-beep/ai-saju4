import { NextRequest, NextResponse } from "next/server";
import { computeSaju } from "@/lib/saju";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const { date, time, place } = JSON.parse(body || "{}");
  const data = computeSaju(date ?? "1995-01-01", time ?? "12:00", place ?? "Seoul");
  // store pillars/elements in response only; client may cache in localStorage
  return NextResponse.json(data);
}
