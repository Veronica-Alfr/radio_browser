export interface IPagination {
    currentOffset: number;
    limit: number;
    totalItems: number;
    onChange: (newOffset: number) => void;
};