import axios from 'axios';

export const getChatData = async (id: number) => {
  const res = await axios.get(`/chatgpt/contents/${id}`);
  return res.data;
};
