import type { useLazyQuery } from "useQuery";
import type { Show } from "../card-show/types";

export type SearchResult = {
  score: number;
  show: Show;
};

export type UseSearchResultsOptions = {
  query: string;
  setShows: (shows: Show[]) => void;
  setIsSearchPending: (value: boolean) => void;
};

export type UseSearchReturn = {
  execute: ReturnType<typeof useLazyQuery<SearchResult[]>>[0];
  cancel: () => void;
  result: ReturnType<typeof useLazyQuery<SearchResult[]>>[1];
};
