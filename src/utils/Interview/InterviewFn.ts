export const parseDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
};
