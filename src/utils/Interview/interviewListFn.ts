import axios from 'axios';

export const parseDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
};

export const getList = async (currentPage: number) => {
  const res = await axios.get(`/chatgpt/lists/8/${currentPage}`);
  return res.data;
};
