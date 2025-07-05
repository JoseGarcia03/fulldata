export function formatDateDDMMYYYY(dateStr: string): string {
  const d = new Date(dateStr);
  const day   = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year  = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export function countByMonth(items: { createdAt?: string }[], date: Date) {
  return items.filter((it) => {
    if (!it.createdAt) return false;
    const d = new Date(it.createdAt);
    return d.getFullYear() === date.getFullYear() && d.getMonth() === date.getMonth();
  }).length;
}