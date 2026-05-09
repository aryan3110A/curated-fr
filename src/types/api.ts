export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type PaginationMeta = {
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
};
