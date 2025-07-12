import { Customer, User } from "./types"; 
export interface IAPIResponseWrapperArray<T> {
    statusCode: number;
    message: string;
    data: T[];
}

export interface IusersResponse {
    message: string;
    users: User[];
}

export interface IEmployeeResponse {
    message: string;
    employees: any[];
}

export interface ICustomerResponse {
    message: string;
    customers: Customer[];
}