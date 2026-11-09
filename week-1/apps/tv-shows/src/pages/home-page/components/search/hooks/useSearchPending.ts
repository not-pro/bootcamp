import { useEffect } from "react";

export function useSearchPending(
  searchValue: string,
  debouncedValue: string,
  isPending: boolean,
  setIsSearchPending: (value: boolean) => void,
) {
  const isSearchPending = searchValue !== "" && (searchValue !== debouncedValue || isPending);

  useEffect(() => {
    setIsSearchPending(isSearchPending);
  }, [isSearchPending, setIsSearchPending]);
}
