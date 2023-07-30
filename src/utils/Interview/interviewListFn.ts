import axios from 'axios';
import { errMsg } from '../../types/Interview/ListTypes';

export const parseDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
};

export const getList = async (currentPage: number) => {
  try {
    const res = await axios.get(`/chatgpt/lists/${currentPage}`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      switch (err.response?.data) {
        case 'GET_LIST_FAILURE':
          return { List: [], numberOfList: 0, totalPages: 0 };
        default:
          return alert('서버 오류입니다. 잠시 후 다시 시도해 주세요.');
      }
    }
  }
};

export const getSearchList = async (
  searchValues: { type: string; keyword: string },
  currentPage: number
) => {
  const payload =
    searchValues.type === 'lists'
      ? { name: searchValues.keyword }
      : { content: searchValues.keyword };

  const res = await axios.post(
    `/chatgpt/search/${searchValues.type}/${currentPage}`,
    payload
  );

  return res.data;
};

export const deleteChat = async (id: number[]) => {
  try {
    if (
      window.confirm(
        `인터뷰가 삭제되고 이 내용은 복구할 수 없습니다.\n정말 삭제하시겠습니까?`
      )
    ) {
      axios.put('/chatgpt/lists', { listIdList: id });
      alert('인터뷰가 삭제되었습니다.');
    }
  } catch (err) {
    if (axios.isAxiosError(err)) alert(errMsg.INTERNAL_SERVER_ERROR);
  }
};
