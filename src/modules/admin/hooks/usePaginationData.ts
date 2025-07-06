import { useEffect, useState } from 'react';
import { usePagination } from '../context/PaginationContext';

interface UsePaginationDataOptions<T> {
    fetchData: (page: number, rowsPerPage: number) => Promise<{
        data: T[];
        total: number;
        totalPages: number;
    }>;
    initialRowsPerPage?: number;
    autoFetch?: boolean;
}

export function usePaginationData<T>({
    fetchData,
    initialRowsPerPage = 10,
    autoFetch = true
}: UsePaginationDataOptions<T>) {
    const {
        paginationState,
        setCurrentPage,
        setRowsPerPage,
        setTotalItems,
        setTotalPages,
        resetPagination
    } = usePagination();

    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadData = async (page: number, rows: number) => {
        try {
            setLoading(true);
            setError(null);
            
            const result = await fetchData(page, rows);
            
            setData(result.data);
            setTotalItems(result.total);
            setTotalPages(result.totalPages);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        if (autoFetch) {
            loadData(page, paginationState.rowsPerPage);
        }
    };

    const handleRowsPerPageChange = (rows: number) => {
        setRowsPerPage(rows);
        if (autoFetch) {
            loadData(1, rows); // Reset to page 1 when changing rows per page
        }
    };

    const refreshData = () => {
        loadData(paginationState.currentPage, paginationState.rowsPerPage);
    };

    const reset = () => {
        resetPagination();
        setData([]);
        setError(null);
    };

    // Auto-fetch data when component mounts or pagination state changes
    useEffect(() => {
        if (autoFetch) {
            loadData(paginationState.currentPage, paginationState.rowsPerPage);
        }
    }, [paginationState.currentPage, paginationState.rowsPerPage]);

    return {
        data,
        loading,
        error,
        paginationState,
        handlePageChange,
        handleRowsPerPageChange,
        refreshData,
        reset,
        loadData // Manual data loading function
    };
} 