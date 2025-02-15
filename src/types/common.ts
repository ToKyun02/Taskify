export type BasePagination = {
  page: number;
  size: number;
};

export type BaseCursor = {
  cursorId: number;
  size: number;
};

export type NavigationMethod = 'infiniteScroll' | 'pagination';

export interface Assignee {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
}
