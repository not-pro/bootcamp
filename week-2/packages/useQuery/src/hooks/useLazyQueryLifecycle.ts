import { useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";
import type { QueryResult } from "../types";

export function useLazyQueryLifecycle<Data>(
  pending: RefObject<((result: QueryResult<Data>) => void) | null>,
) {
  const mounted = useRef(false);

  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      // StrictMode replays effects before this microtask runs.
      queueMicrotask(() => {
        if (!mounted.current) {
          pending.current?.({ data: undefined, loading: false, error: null });
          pending.current = null;
        }
      });
    };
  }, [pending]);

  return mounted;
}
