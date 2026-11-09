import { useHomePageContext } from "@pages/home-page/contexts/hooks/useHomePageContext";
import { useScrollPagination } from "./useScrollPagination";

export function usePresenter() {
  const { shows, isSearchPending, hasSearchError, retrySearch, resetAll } = useHomePageContext();
  const { visibleShows, pagination } = useScrollPagination(shows);

  return {
    shows: visibleShows,
    isSearchPending,
    hasSearchError,
    retrySearch,
    resetAll,
    pagination,
  };
}
