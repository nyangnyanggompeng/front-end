export interface InterviewListData {
  id: number;
  name: string;
  type: string;
  createdAt: string;
}

export interface InterviewData {
  List: InterviewListData[];
  numberOfList: number;
  totalPages: number;
}

export type errTypes =
  | 'INTERNAL_SERVER_ERROR'
  | 'LIST_NAME_NO_ENTERED'
  | 'LIST_NAME_ALREADY_EXISTS'
  | 'UNABLE_TO_CREATE_LIST_ANYMORE';

export const errMsg: Record<errTypes, string> = {
  INTERNAL_SERVER_ERROR: '서버 에러입니다. 잠시 후 다시 접속해 주세요.',
  LIST_NAME_NO_ENTERED: '새 대화방의 이름을 입력해 주세요.',
  LIST_NAME_ALREADY_EXISTS: '이미 있는 이름입니다. 다시 입력해 주세요.',
  UNABLE_TO_CREATE_LIST_ANYMORE: '인터뷰를 더 만들 수 없습니다.',
};

export interface InterviewDetailData {
  id: number;
  questionNum: number;
  sender: 'user' | 'assistant';
  content: string;
  bookmark: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  listId: number;
}
