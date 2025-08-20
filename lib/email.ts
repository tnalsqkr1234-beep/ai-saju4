import { Resend } from 'resend';
export const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendFortuneEmail(to:string, subject:string, html:string){
  if(!process.env.RESEND_FROM) throw new Error('RESEND_FROM is not set');
  return resend.emails.send({ from: process.env.RESEND_FROM as string, to, subject, html });
}
