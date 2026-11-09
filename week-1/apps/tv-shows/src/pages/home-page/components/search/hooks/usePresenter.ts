import { useHomePageContext } from "@pages/home-page/contexts/hooks/useHomePageContext";
import { useSearchInput } from "./useSearchInput";
import { useSearchResults } from "./useSearchResults";

export function usePresenter() {
  const { query, setQuery, setShows, setIsSearchPending, setHasSearchError, retryCount } =
    useHomePageContext();
  const handleChange = useSearchInput(setQuery);
  const isPending = useSearchResults({
    query,
    setShows,
    setIsSearchPending,
    setHasSearchError,
    retryCount,
  });

  return {
    value: query,
    handleChange,
    isPending,
  };
}
