
export interface IAPIResponseWrapperArray<T> {
    statusCode: number;
    message: string;
    data: T[];
}