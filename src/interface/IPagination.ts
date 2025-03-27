export interface IPagination {
    currentOffset: number;
    isLoading: boolean;
    limit: number;
    totalItems: number;
    onChange: (newOffset: number) => void;
};