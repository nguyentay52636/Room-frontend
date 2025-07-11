
export interface IAPIResponseWrapperArray<T> {
    statusCode: number;
    message: string;
    data: T[];
}

export interface IEmployeeResponse {
    message: string;
    employees: any[];
}