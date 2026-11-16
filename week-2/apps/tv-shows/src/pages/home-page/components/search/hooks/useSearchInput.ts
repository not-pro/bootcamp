import { useCallback, type ChangeEvent } from "react";

export function useSearchInput(setQuery: (query: string) => void) {
  return useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    [setQuery],
  );
}
