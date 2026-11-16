import { useQueryRequest } from "./hooks/useQueryRequest";
import type { QueryOptions, QueryResult } from "./types";

export function useQuery<Data = unknown>(options: QueryOptions<Data>): QueryResult<Data> {
  return useQueryRequest(options, 0);
}
