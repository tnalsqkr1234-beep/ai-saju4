import { NextRequest, NextResponse } from 'next/server';
import { computeSaju } from '../../../lib/saju';
import { sajuPairScore, mbtiPairScore, combineCompatScore, compatNarrative } from '../../../lib/compat';
export const runtime = 'nodejs';
export async function POST(req:NextRequest){ const { A, B } = await req.json(); const aSaju=computeSaju(A.date,A.time); const bSaju=computeSaju(B.date,B.time); const sScore=sajuPairScore(aSaju.elements,bSaju.elements); const mScore=mbtiPairScore(String(A.mbti).toUpperCase(), String(B.mbti).toUpperCase()); const total=combineCompatScore(sScore,mScore); const lanes=compatNarrative({sajuScore:sScore,mbtiScore:mScore,total}); return NextResponse.json({ sajuScore:sScore, mbtiScore:mScore, total, lanes }); }
