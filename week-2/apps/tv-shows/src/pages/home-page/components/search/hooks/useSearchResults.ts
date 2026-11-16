import { useEffect, useMemo, useTransition } from "react";
import { useDebounce } from "@hooks";
import type { UseSearchResultsOptions } from "../types";
import { useSearch } from "./useSearch";
import { useSearchPending } from "./useSearchPending";

const SEARCH_DEBOUNCE_MS = 300;

export function useSearchResults({
  query,
  setShows,
  setIsSearchPending,
  setHasSearchError,
  retryCount,
}: UseSearchResultsOptions) {
  const searchValue = query.trim();
  const debouncedValue = useDebounce(searchValue, SEARCH_DEBOUNCE_MS);
  const request = useMemo(
    () => ({ query: debouncedValue, retryCount }),
    [debouncedValue, retryCount],
  );
  const { execute, cancel } = useSearch(debouncedValue);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setHasSearchError(false);
    if (searchValue === "" || searchValue !== request.query) {
      cancel();
      if (searchValue === "") setShows([]);
      return undefined;
    }
    let active = true;
    const completion = execute();
    startTransition(async () => {
      const result = await completion;
      if (!active) return;
      startTransition(() => {
        setHasSearchError(Boolean(result.error));
        setShows(result.data?.map((item) => item.show) ?? []);
        setIsSearchPending(false);
      });
    });
    return () => {
      active = false;
      cancel();
    };
  }, [
    searchValue,
    request,
    execute,
    cancel,
    startTransition,
    setShows,
    setIsSearchPending,
    setHasSearchError,
  ]);

  useSearchPending(searchValue, debouncedValue, isPending, setIsSearchPending);

  return isPending;
}
