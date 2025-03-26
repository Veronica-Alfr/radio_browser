export interface IPagination {
    currentOffset: number;
    isLoading: boolean;
    limit: number;
    hasMore: boolean;
    onChange: (newOffset: number) => void;
};