export interface IPagination {
    currentOffset: number;
    isLoading: boolean;
    isSmallScreen?: boolean;
    limit: number;
    totalItems: number;
    onChange: (newOffset: number) => void;
};