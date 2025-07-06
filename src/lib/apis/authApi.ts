export interface IAPIResponseWrapper<T> {
  statusCode: number;
  message: string;
  data: T;
}