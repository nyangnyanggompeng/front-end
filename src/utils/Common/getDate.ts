export function getDate(date: Date) {
  const currentDate = new Date();
  if (
    date.getFullYear() !== currentDate.getFullYear() ||
    date.getMonth() !== currentDate.getMonth() ||
    date.getDate() !== currentDate.getDate()
  ) {
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  }
  return `${date.getHours()}:${date.getMinutes()}`;
}
