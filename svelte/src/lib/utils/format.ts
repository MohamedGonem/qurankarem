/** Arabic label for a number of ayahs. */
export function ayahCountLabel(count: number): string {
  if (count <= 10) return `${count} آيات`;
  return `${count} آية`;
}

/** Format a number of seconds as m:ss. */
export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";

  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const rest = total % 60;

  return `${minutes}:${String(rest).padStart(2, "0")}`;
}
