// types/solarlunar.d.ts
declare module 'solarlunar' {
  export interface LunarResult { gzYear:string; gzMonth:string; gzDay:string; lunarYear:number; lunarMonth:number; lunarDay:number; animal?:string; isLeap?:boolean; }
  const solarlunar: { solar2lunar(y:number,m:number,d:number):LunarResult; lunar2solar(y:number,m:number,d:number,isLeap?:boolean):{year:number;month:number;day:number}; };
  export default solarlunar;
}
