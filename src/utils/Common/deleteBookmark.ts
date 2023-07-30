import axios from 'axios';

export async function deleteBookmark(contentId: number) {
  try {
    await axios.patch(`/mypage/bookmark/${contentId}?isBookmarked=false`);
    return;
  } catch (error: unknown) {
    throw new Error('INTERNAL_SERVER_ERROR');
  }
}
