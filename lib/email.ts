// lib/email.ts
export async function sendFortuneEmail(to: string, subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  // 키가 없으면 조용히 스킵 (빌드/프리뷰에서도 안전)
  if (!key || !from) {
    console.warn("[sendFortuneEmail] RESEND_API_KEY or RESEND_FROM missing — skip email send.");
    return { skipped: true as const };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(key);
  return resend.emails.send({ from, to, subject, html });
}
