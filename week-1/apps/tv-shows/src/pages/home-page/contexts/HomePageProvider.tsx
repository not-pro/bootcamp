import { useCallback, useMemo, useState } from "react";
import type { HomePageProviderProps } from "./types";
import { HomePageContext } from "./HomePageContext";
import type { Show } from "../components/card-show/types";

const INITIAL_QUERY = "";
const INITIAL_FILTERS: Record<string, string[]> = {};
const INITIAL_SHOWS: Show[] = [];

export function HomePageProvider({ children }: HomePageProviderProps) {
  const [query, setQuery] = useState(INITIAL_QUERY);
  const [selectedFilters, setSelectedFilters] = useState(INITIAL_FILTERS);
  const [shows, setShows] = useState(INITIAL_SHOWS);
  const [isSearchPending, setIsSearchPending] = useState(false);
  const [hasSearchError, setHasSearchError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const retrySearch = useCallback(() => {
    if (query.trim() === "") return;
    setHasSearchError(false);
    setIsSearchPending(true);
    setRetryCount((count) => count + 1);
  }, [query]);

  const resetAll = useCallback(() => {
    setQuery(INITIAL_QUERY);
    setSelectedFilters(INITIAL_FILTERS);
    setShows(INITIAL_SHOWS);
    setIsSearchPending(false);
    setHasSearchError(false);
  }, []);

  const value = useMemo(
    () => ({
      query,
      setQuery,
      selectedFilters,
      setSelectedFilters,
      shows,
      setShows,
      isSearchPending,
      setIsSearchPending,
      hasSearchError,
      setHasSearchError,
      retryCount,
      retrySearch,
      resetAll,
    }),
    [
      query,
      selectedFilters,
      shows,
      isSearchPending,
      hasSearchError,
      retryCount,
      retrySearch,
      resetAll,
    ],
  );

  return <HomePageContext.Provider value={value}>{children}</HomePageContext.Provider>;
}
