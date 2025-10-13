export interface CommonResponse<T> {
  data?: T;
  statusCode: number;
  message: string;
  error?: string;
}
