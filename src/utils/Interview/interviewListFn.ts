import axios from 'axios';

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
  try {
    const payload =
      searchValues.type === 'lists'
        ? { name: searchValues.keyword }
        : { content: searchValues.keyword };

    const res = await axios.post(
      `/chatgpt/search/${searchValues.type}/${currentPage}`,
      payload
    );

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      switch (err.response?.status) {
        case 400:
          return {
            Result: [],
            numberOfResult: 0,
            totalPages: 0,
          };
        default:
          return console.log('500 페이지 이동');
      }
    }
  }
};
