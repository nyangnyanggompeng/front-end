export type BookMarkType = {
  id: number;
  content: string;
  listId: number;
  ChatGPTList: {
    name: string;
  };
};

export type BookMarkData = {
  Content: BookMarkType[];
  numberOfContent: number;
  totalPages: number;
};
