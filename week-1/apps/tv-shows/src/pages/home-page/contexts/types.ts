import type { Show } from "../components/card-show/types";

export type HomePageState = {
  query: string;
  setQuery: (query: string) => void;
  selectedFilters: Record<string, string[]>;
  setSelectedFilters: (filters: Record<string, string[]>) => void;
  shows: Show[];
  setShows: (shows: Show[]) => void;
  isSearchPending: boolean;
  setIsSearchPending: (value: boolean) => void;
  resetAll: () => void;
};

export type HomePageProviderProps = {
  children: React.ReactNode;
};
