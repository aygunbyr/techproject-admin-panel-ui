export type ServiceResult<TData> = {
  errorMessage: string | string[] | null;
  data?: TData;
};
