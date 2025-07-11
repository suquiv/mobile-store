export function getCachedData(key) {
  const data = localStorage.getItem(key);
  if (!data) return null;

  const { value, timestamp } = JSON.parse(data);
  const isExpired = Date.now() - timestamp > 3600000; // 1 hora
  return isExpired ? null : value;
}

export function setCachedData(key, value) {
  localStorage.setItem(key, JSON.stringify({ value, timestamp: Date.now() }));
}