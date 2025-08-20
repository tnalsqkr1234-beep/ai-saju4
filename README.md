# AI 사주+MBTI — 무료 베타
- 일일 구독(이메일/크론/KV) + 궁합 + 건당 분석 + 월별 리포트 포함
- 실제 만세력(간지/오행) 기반 + MBTI 결합 가이드

## 환경변수 (Vercel)
- RESEND_API_KEY, RESEND_FROM
- KV_REST_API_URL, KV_REST_API_TOKEN
- (선택) APP_BASE_URL — 해지 링크 절대주소

## 로컬
npm i
npm run dev
# http://localhost:3000

## 주요 페이지
/ — 랜딩
/subscribe/daily — 일일 구독
/compatibility — 궁합 (A/B 입력)
/analysis/concern — 건당 분석
/months — 월별 리포트

## API
POST /api/subscribe  (구독 저장 + 환영 메일)
GET  /api/cron/daily-send (매일 07:00 KST, vercel.json 크론)
POST /api/compatibility → { A:{date,time,mbti}, B:{...} }
POST /api/analysis/concern → { topic?, text?, date, time, mbti }
/api/fortune/daily, /api/fortune/monthly
