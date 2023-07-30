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

export interface FormData {
  type: string;
  count: string;
  prompt: string;
}
