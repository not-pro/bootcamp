import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { LazyQueryRequest, QueryOptions, QueryResult } from "../types";
import { useLazyQueryLifecycle } from "./useLazyQueryLifecycle";

export function useLazyQueryExecution<Data>(options: QueryOptions<Data>) {
  const latestOptions = useRef(options);
  const pending = useRef<((result: QueryResult<Data>) => void) | null>(null);
  const executionCount = useRef(0);
  const [request, setRequest] = useState<LazyQueryRequest<Data> | null>(null);

  useLayoutEffect(() => {
    latestOptions.current = options;
  });

  const mounted = useLazyQueryLifecycle(pending);

  const execute = useCallback(() => {
    pending.current?.({ data: undefined, loading: false, error: null });
    if (!mounted.current) {
      return Promise.resolve({ data: undefined, loading: false, error: null });
    }
    const nextOptions = latestOptions.current;
    return new Promise<QueryResult<Data>>((resolve) => {
      pending.current = resolve;
      setRequest({
        options: nextOptions,
        executionCount: ++executionCount.current,
        resolve,
      });
    });
  }, [mounted]);

  const cancel = useCallback(() => {
    pending.current?.({ data: undefined, loading: false, error: null });
    pending.current = null;
    setRequest(null);
  }, []);

  return { request, execute, cancel };
}
