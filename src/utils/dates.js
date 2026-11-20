export function dateFromInput(value) {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}
export function daysUntil(value) {
  const deadline = dateFromInput(value);
  if (!deadline) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((deadline.getTime() - today.getTime()) / 86400000);
}
export function formatDate(value) {
  const d = dateFromInput(value);
  return d ? d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Tarih girilmedi';
}
export function deadlineLabel(value, status) {
  if (status === 'Kabul' || status === 'Ret') return 'Tamamlandı';
  const days = daysUntil(value);
  if (days === null) return 'Tarih yok';
  if (days < 0) return 'Süre geçti';
  if (days === 0) return 'Son gün!';
  if (days === 1) return '1 gün kaldı';
  return `${days} gün kaldı`;
}
export function deadlineTone(value, status) {
  if (status === 'Kabul' || status === 'Ret') return 'neutral';
  const days = daysUntil(value);
  if (days === null) return 'neutral';
  if (days < 0 || days <= 3) return 'danger';
  if (days <= 7) return 'warning';
  return 'success';
}
