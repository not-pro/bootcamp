import { useCallback, useState } from "react";
import { useQueryRequest } from "./hooks/useQueryRequest";
import type { QueryOptions, QueryResult } from "./types";

export function useLazyQuery<Data = unknown>(
  options: QueryOptions<Data>,
): [execute: () => void, result: QueryResult<Data>] {
  const [executionCount, setExecutionCount] = useState<number | null>(null);
  const execute = useCallback(() => setExecutionCount((previous) => (previous ?? 0) + 1), []);
  const result = useQueryRequest(options, executionCount);

  return [execute, result];
}
