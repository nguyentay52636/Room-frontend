import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PaginationState {
    currentPage: number;
    rowsPerPage: number;
    totalItems: number;
    totalPages: number;
}

interface PaginationContextType {
    paginationState: PaginationState;
    setCurrentPage: (page: number) => void;
    setRowsPerPage: (rows: number) => void;
    setTotalItems: (total: number) => void;
    setTotalPages: (pages: number) => void;
    resetPagination: () => void;
}

const defaultPaginationState: PaginationState = {
    currentPage: 1,
    rowsPerPage: 10,
    totalItems: 0,
    totalPages: 1,
};

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

interface PaginationProviderProps {
    children: ReactNode;
    initialRowsPerPage?: number;
}

export function PaginationProvider({
    children,
    initialRowsPerPage = 10
}: PaginationProviderProps) {
    const [paginationState, setPaginationState] = useState<PaginationState>({
        ...defaultPaginationState,
        rowsPerPage: initialRowsPerPage,
    });

    const setCurrentPage = (page: number) => {
        setPaginationState(prev => ({
            ...prev,
            currentPage: page,
        }));
    };

    const setRowsPerPage = (rows: number) => {
        setPaginationState(prev => ({
            ...prev,
            rowsPerPage: rows,
            currentPage: 1, // Reset to first page when changing rows per page
        }));
    };

    const setTotalItems = (total: number) => {
        setPaginationState(prev => ({
            ...prev,
            totalItems: total,
            totalPages: Math.ceil(total / prev.rowsPerPage),
        }));
    };

    const setTotalPages = (pages: number) => {
        setPaginationState(prev => ({
            ...prev,
            totalPages: pages,
        }));
    };

    const resetPagination = () => {
        setPaginationState({
            ...defaultPaginationState,
            rowsPerPage: initialRowsPerPage,
        });
    };

    const value: PaginationContextType = {
        paginationState,
        setCurrentPage,
        setRowsPerPage,
        setTotalItems,
        setTotalPages,
        resetPagination,
    };

    return (
        <PaginationContext.Provider value={value}>
            {children}
        </PaginationContext.Provider>
    );
}

export function usePagination() {
    const context = useContext(PaginationContext);
    if (context === undefined) {
        throw new Error('usePagination must be used within a PaginationProvider');
    }
    return context;
} 