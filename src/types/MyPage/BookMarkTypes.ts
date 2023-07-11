export type BookMarkType = {
  contentId: number;
  content: string;
  roomId: number;
  roomName: string;
};

export type BookMarkData = {
  bookmark: BookMarkType[];
  numberOfBookmark: number;
  totalPages: number;
};
