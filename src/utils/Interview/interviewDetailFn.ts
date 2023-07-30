import axios from 'axios';

export const getChatData = async (id: number) => {
  try {
    const res = await axios.get(`/chatgpt/contents/${id}`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      switch (err.response?.status) {
        case 500:
          return [{ prompt: '', type: '일반', count: '1' }, []];
        case 400:
          return alert('대화 목록이 존재하지 않습니다.');
        default:
          alert('서버 오류입니다. 잠시 후 다시 시도해 주세요.');
      }
    }
  }
};

export const bookmarkToggle = async (
  contentId: number,
  isBookmarked: boolean
) => {
  try {
    await axios.patch(
      `/mypage/bookmark/${contentId}?isBookmarked=${isBookmarked}`
    );
  } catch (err) {
    if (axios.isAxiosError(err)) {
      switch (err.response?.status) {
        case 500:
          return alert('북마크 상태가 변경되지 않았습니다.');
        default:
          return alert('서버 오류입니다. 잠시 후 다시 시도해 주세요.');
      }
    }
  }
};
