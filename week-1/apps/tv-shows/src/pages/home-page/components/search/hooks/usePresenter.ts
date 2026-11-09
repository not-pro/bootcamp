import { useHomePageContext } from "@pages/home-page/contexts/hooks/useHomePageContext";
import { useSearchInput } from "./useSearchInput";
import { useSearchResults } from "./useSearchResults";

export function usePresenter() {
  const { query, setQuery, setShows, setIsSearchPending } = useHomePageContext();
  const handleChange = useSearchInput(setQuery);
  const isPending = useSearchResults({ query, setShows, setIsSearchPending });

  return {
    value: query,
    handleChange,
    isPending,
  };
}
