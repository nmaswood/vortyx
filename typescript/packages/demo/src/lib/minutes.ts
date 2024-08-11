export function minutes(n: number) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60 * n);
  return time;
}
