import { useCallback, useMemo, useState } from "react";
import type { Show } from "@pages/home-page/components/card-show/types";
import type { GridPaginationProps } from "@ui-kit";

const PAGE_SIZE = 3;

export function useScrollPagination(shows: Show[]) {
  const pageCount = Math.max(1, Math.ceil(shows.length / PAGE_SIZE));
  const [state, setState] = useState({ shows, page: 1 });

  if (state.shows !== shows) {
    setState({ shows, page: 1 });
  }

  const visibleShows = useMemo(() => shows.slice(0, state.page * PAGE_SIZE), [shows, state.page]);

  const hasNextPage = state.page < pageCount;
  const hasPreviousPage = state.page > 1;

  const onNextPage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      page: Math.min(prev.page + 1, pageCount),
    }));
  }, [pageCount]);

  const onPreviousPage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      page: Math.max(prev.page - 1, 1),
    }));
  }, []);

  const pagination: GridPaginationProps = useMemo(
    () => ({
      hasNextPage,
      hasPreviousPage,
      onNextPage,
      onPreviousPage,
      totalCount: shows.length,
    }),
    [hasNextPage, hasPreviousPage, onNextPage, onPreviousPage, shows.length],
  );

  return { visibleShows, pagination };
}
