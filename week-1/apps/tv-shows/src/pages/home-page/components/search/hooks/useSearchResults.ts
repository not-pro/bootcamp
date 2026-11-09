import { useEffect, useTransition } from "react";
import { useDebounce } from "@hooks";
import type { UseSearchResultsOptions } from "../types";
import { useSearch } from "./useSearch";
import { useSearchPending } from "./useSearchPending";

const SEARCH_DEBOUNCE_MS = 300;
const SEARCH_RESULT_LIMIT = 3;

export function useSearchResults({ query, setShows, setIsSearchPending }: UseSearchResultsOptions) {
  const searchValue = query.trim();
  const debouncedValue = useDebounce(searchValue, SEARCH_DEBOUNCE_MS);
  const { execute, cancel } = useSearch(debouncedValue);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (searchValue === "" || searchValue !== debouncedValue) {
      cancel();
      if (searchValue === "") setShows([]);
      return undefined;
    }
    let active = true;
    // Запуск эффекта запроса должен закоммититься до ожидания его результата в transition.
    const completion = execute();
    startTransition(async () => {
      const result = await completion;
      if (!active) return;
      startTransition(() => {
        setShows(result.data?.slice(0, SEARCH_RESULT_LIMIT).map((item) => item.show) ?? []);
        setIsSearchPending(false);
      });
    });
    return () => {
      active = false;
      cancel();
    };
  }, [searchValue, debouncedValue, execute, cancel, startTransition, setShows, setIsSearchPending]);

  useSearchPending(searchValue, debouncedValue, isPending, setIsSearchPending);

  return isPending;
}
