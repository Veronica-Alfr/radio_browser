export interface ISearchBar {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
}