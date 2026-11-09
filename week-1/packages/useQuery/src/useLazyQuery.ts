import { useLazyQueryExecution } from "./hooks/useLazyQueryExecution";
import { useQueryRequest } from "./hooks/useQueryRequest";
import type { LazyQueryResult, QueryOptions } from "./types";

export function useLazyQuery<Data = unknown>(options: QueryOptions<Data>): LazyQueryResult<Data> {
  const { request, execute, cancel } = useLazyQueryExecution(options);
  const result = useQueryRequest<Data>(
    {
      ...(request?.options ?? options),
      onSuccess: (data) => options.onSuccess?.(data),
      onError: (error) => options.onError?.(error),
    },
    request?.executionCount ?? null,
    request?.resolve,
  );

  return [execute, result, cancel];
}
