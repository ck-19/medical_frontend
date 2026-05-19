export function formatDate(value, fallback = '—') {
  if (!value) return fallback;
  const d = new Date(String(value).slice(0, 10));
  return Number.isNaN(d.getTime()) ? fallback : d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatDateForInput(value) {
  return value ? String(value).slice(0, 10) : '';
}
