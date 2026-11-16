import { useMemo } from "react";
import { useHomePageContext } from "@pages/home-page/contexts/hooks/useHomePageContext";
import { useScrollPagination } from "./useScrollPagination";

function filterShows(shows: any[], selectedFilters: Record<string, string[]>) {
  const genres = selectedFilters["genre"] ?? [];
  const years = selectedFilters["year"] ?? [];
  const ratings = selectedFilters["rating"] ?? [];

  return shows.filter((show) => {
    if (genres.length > 0) {
      const showGenres = show.genres ?? [];
      if (!showGenres.some((g: string) => genres.includes(g))) {
        return false;
      }
    }

    if (years.length > 0) {
      const year = show.premiered;
      if (!year) return false;
      const showYear = year.split("-")[0];
      if (!years.includes(showYear)) {
        return false;
      }
    }

    if (ratings.length > 0) {
      const rating = show.rating?.average;
      if (rating == null) return false;
      const matches = ratings.some((r) => {
        const minRating = parseInt(r.replace("+", ""), 10);
        return rating >= minRating;
      });
      if (!matches) return false;
    }

    return true;
  });
}

export function usePresenter() {
  const { shows, selectedFilters, isSearchPending, hasSearchError, retrySearch, resetAll } =
    useHomePageContext();
  const filteredShows = useMemo(
    () => filterShows(shows, selectedFilters),
    [shows, selectedFilters],
  );
  const { visibleShows, pagination } = useScrollPagination(filteredShows);

  return {
    shows: visibleShows,
    isSearchPending,
    hasSearchError,
    retrySearch,
    resetAll,
    pagination,
  };
}
