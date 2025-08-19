import solarlunar from "solarlunar";

export type Elements = { wood: number; fire: number; earth: number; metal: number; water: number };
export type Pillars = { year: string; month: string; day: string; hour: string };

const stems = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
const branches = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];

// 오행 매핑
const elementMap: Record<string, "木"|"火"|"土"|"金"|"水"> = {
  "甲":"木","乙":"木","丙":"火","丁":"火","戊":"土","己":"土","庚":"金","辛":"金","壬":"水","癸":"水",
  "子":"水","丑":"土","寅":"木","卯":"木","辰":"土","巳":"火","午":"火","未":"土","申":"金","酉":"金","戌":"土","亥":"水",
};

export function computeSaju(dateStr: string, timeStr: string, place?: string): { pillars: Pillars; elements: Elements; notes: string[] } {
  const [y,m,d] = dateStr.split("-").map(Number);
  const hour = parseInt(timeStr.split(":")[0] || "12", 10);

  const lunar = solarlunar.solar2lunar(y, m, d); // { gzYear, gzMonth, gzDay, ... }

  const yearGZ = lunar.gzYear;   // e.g., "甲子"
  const monthGZ = lunar.gzMonth; // e.g., "丙寅"
  const dayGZ = lunar.gzDay;     // e.g., "丁巳"

  const dayStem = dayGZ[0];
  const hourBranch = branchFromHour(hour);
  const hourStem = hourStemFromDayStem(dayStem, hourBranch);
  const hourGZ = hourStem + hourBranch;

  const pillars: Pillars = { year: yearGZ, month: monthGZ, day: dayGZ, hour: hourGZ };

  const counts = { "木":0, "火":0, "土":0, "金":0, "水":0 } as Record<string, number>;
  for (const p of [yearGZ, monthGZ, dayGZ, hourGZ]) {
    const [g, z] = [p[0], p[1]];
    counts[elementMap[g]] += 1;
    counts[elementMap[z]] += 1;
  }
  const sum = Object.values(counts).reduce((a,b)=>a+b,0);
  const ratioCN = Object.fromEntries(Object.entries(counts).map(([k,v])=>[k, Math.round(v/sum*100)])) as Record<string, number>;

  const elements: Elements = {
    wood: ratioCN["木"], fire: ratioCN["火"], earth: ratioCN["土"], metal: ratioCN["金"], water: ratioCN["水"]
  };

  const notes = [`강한 오행: ${maxKeyCN(ratioCN)} / 약한 오행: ${minKeyCN(ratioCN)}`];
  return { pillars, elements, notes };
}

function branchFromHour(hour: number): string {
  // 子:23-01, 丑:01-03, 寅:03-05, 卯:05-07, 辰:07-09, 巳:09-11, 午:11-13, 未:13-15, 申:15-17, 酉:17-19, 戌:19-21, 亥:21-23
  const slots = [
    [23, "子"], [0, "子"],
    [1, "丑"], [2, "丑"],
    [3, "寅"], [4, "寅"],
    [5, "卯"], [6, "卯"],
    [7, "辰"], [8, "辰"],
    [9, "巳"], [10, "巳"],
    [11, "午"], [12, "午"],
    [13, "未"], [14, "未"],
    [15, "申"], [16, "申"],
    [17, "酉"], [18, "酉"],
    [19, "戌"], [20, "戌"],
    [21, "亥"], [22, "亥"]
  ] as [number, string][];
  const found = slots.find(s => s[0] === hour);
  return found ? found[1] : "子";
}

function hourStemFromDayStem(dayStem: string, hourBranch: string): string {
  // 자시의 천간 시작: 甲己→甲, 乙庚→丙, 丙辛→戊, 丁壬→庚, 戊癸→壬
  const startMap: Record<string, string> = {
    "甲":"甲","己":"甲",
    "乙":"丙","庚":"丙",
    "丙":"戊","辛":"戊",
    "丁":"庚","壬":"庚",
    "戊":"壬","癸":"壬"
  };
  const startStem = startMap[dayStem] || "甲";
  const startIndex = stems.indexOf(startStem);
  const branchIndex = branches.indexOf(hourBranch); // 子=0..
  return stems[(startIndex + branchIndex) % 10];
}

function maxKeyCN(obj: Record<string, number>): string {
  return Object.entries(obj).sort((a,b)=>b[1]-a[1])[0][0];
}
function minKeyCN(obj: Record<string, number>): string {
  return Object.entries(obj).sort((a,b)=>a[1]-b[1])[0][0];
}

export function luckyFromElements(e: Elements) {
  const palette: Record<string, string> = {
    wood: "#91C788", fire: "#FF8A65", earth: "#C2B280", metal: "#B0BEC5", water: "#90CAF9"
  };
  const max = Object.entries(e).sort((a,b)=>b[1]-a[1])[0];
  const color = palette[max[0] as keyof typeof palette];
  const number = (Object.values(e).reduce((a,b)=>a+b,0) % 9) + 1;
  const items = ["가벼운 목걸이", "은은한 핸드크림", "심플한 볼펜", "작은 노트", "실버 반지", "카드지갑"];
  const item = items[ Object.values(e).reduce((a,b)=>a+b,0) % items.length ];
  return { color, number, item };
}
