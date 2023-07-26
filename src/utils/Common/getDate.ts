export function getDate(date: Date) {
  const currentDate = new Date();
  if (
    date.getFullYear() !== currentDate.getFullYear() ||
    date.getMonth() !== currentDate.getMonth() ||
    date.getDate() !== currentDate.getDate()
  ) {
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${date.getFullYear()}.${month}.${day}`;
  }
  const hour = `${date.getHours()}`.padStart(2, '0');
  const minute = `${date.getMinutes()}`.padStart(2, '0');
  return `${hour}:${minute}`;
}
