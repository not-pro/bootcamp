import { useCallback, useLayoutEffect, useRef } from "react";
import type { GridPaginationProps } from "../Grid";

export function useGridPagination(pagination?: GridPaginationProps) {
  const list = useRef<HTMLUListElement>(null);
  const hadFocus = useRef(false);

  // Если внешняя логика убрала сфокусированную карточку, вернём фокус на сетку.
  useLayoutEffect(() => {
    if (hadFocus.current && document.activeElement === document.body) {
      list.current?.parentElement?.focus({ preventScroll: true });
    }
    const currentList = list.current;
    return () => {
      hadFocus.current = currentList?.contains(document.activeElement) ?? false;
    };
  });

  const change = useCallback(
    (direction: number) => {
      if (!pagination || pagination.isLoading) return;
      if (direction > 0 && pagination.hasNextPage) pagination.onNextPage();
      if (direction < 0 && pagination.hasPreviousPage) pagination.onPreviousPage();
    },
    [pagination],
  );

  return { list, change };
}
