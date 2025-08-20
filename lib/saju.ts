import solarlunar from 'solarlunar';
export type Elements = { wood:number; fire:number; earth:number; metal:number; water:number };
export type Pillars = { year:string; month:string; day:string; hour:string };
const elementMap: Record<string,'木'|'火'|'土'|'金'|'水'> = { '甲':'木','乙':'木','丙':'火','丁':'火','戊':'土','己':'土','庚':'金','辛':'金','壬':'水','癸':'水','子':'水','丑':'土','寅':'木','卯':'木','辰':'土','巳':'火','午':'火','未':'土','申':'金','酉':'金','戌':'土','亥':'水' };
export function computeSaju(dateStr:string, timeStr:string){
  const [y,m,d] = dateStr.split('-').map(Number);
  const hour = parseInt((timeStr||'12:00').split(':')[0], 10);
  const lunar = solarlunar.solar2lunar(y,m,d);
  const yearGZ = lunar.gzYear, monthGZ = lunar.gzMonth, dayGZ = lunar.gzDay;
  const dayStem = dayGZ[0]; const hourBranch = branchFromHour(hour); const hourStem = hourStemFromDayStem(dayStem, hourBranch); const hourGZ = hourStem + hourBranch;
  const pillars = { year:yearGZ, month:monthGZ, day:dayGZ, hour:hourGZ };
  const counts: Record<'木'|'火'|'土'|'金'|'水',number> = { '木':0,'火':0,'土':0,'金':0,'水':0 };
  for (const p of [yearGZ, monthGZ, dayGZ, hourGZ]){ const g=p[0], z=p[1]; counts[elementMap[g]]+=1; counts[elementMap[z]]+=1; }
  const sum = Object.values(counts).reduce((a,b)=>a+b,0) || 1;
  const pct = { '木':Math.round(counts['木']/sum*100), '火':Math.round(counts['火']/sum*100), '土':Math.round(counts['土']/sum*100), '金':Math.round(counts['金']/sum*100), '水':Math.round(counts['水']/sum*100) };
  const elements: Elements = { wood:pct['木'], fire:pct['火'], earth:pct['土'], metal:pct['金'], water:pct['水'] };
  return { pillars, elements };
}
function branchFromHour(hour:number){ const map=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']; return map[Math.floor(((hour+1)%24)/2)]; }
function hourStemFromDayStem(dayStem:string, hourBranch:string){
  const startMap:Record<string,string>={'甲':'甲','己':'甲','乙':'丙','庚':'丙','丙':'戊','辛':'戊','丁':'庚','壬':'庚','戊':'壬','癸':'壬'};
  const stems=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸']; const branches=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
  const startStem=startMap[dayStem]||'甲'; const startIndex=stems.indexOf(startStem); const branchIndex=branches.indexOf(hourBranch);
  return stems[(startIndex+branchIndex)%10];
}
