const grouping = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const grouping2 = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function aed0(cents: number) {
  return grouping.format(Math.round(cents / 100));
}

export function aed2(cents: number) {
  return grouping2.format(cents / 100);
}

export function aedParts(cents: number): [string, string] {
  const [whole, decimals] = grouping2.format(cents / 100).split(".");
  return [whole, decimals];
}

export function percent(part: number, whole: number) {
  return whole === 0 ? 0 : Math.round((part / whole) * 100);
}

function parts(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return { y, m, d, dt: new Date(Date.UTC(y, m - 1, d)) };
}

const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const LONG_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function fmtDate(date: string) {
  const { y, m, d } = parts(date);
  return `${d} ${SHORT_MONTHS[m - 1]} ${y}`;
}

export function fmtDayMonth(date: string) {
  const { m, d } = parts(date);
  return `${d} ${SHORT_MONTHS[m - 1]}`;
}

export function fmtDayHeading(date: string) {
  const { m, d, dt } = parts(date);
  return `${WEEKDAYS[dt.getUTCDay()]}, ${d} ${LONG_MONTHS[m - 1]}`;
}
