import { useEffect, useEffectEvent, useState } from "react";
import type { QueryOptions, QueryResult } from "../types";
import { STORE } from "../store";

export function useQueryRequest<Data = unknown>(
  { endpoint, queryKey, onError, onSuccess, fetchPolicy = "cache-first" }: QueryOptions<Data>,
  executionCount: number | null,
  onSettled?: (result: QueryResult<Data>) => void,
): QueryResult<Data> {
  const apiUrl = `${STORE.getBaseUrl()}${endpoint}`;
  const cacheKey = JSON.stringify([queryKey, apiUrl]);
  const requestKey = JSON.stringify([cacheKey, fetchPolicy, executionCount]);
  const initialResult: QueryResult<Data> = {
    data: undefined,
    loading:
      executionCount !== null &&
      fetchPolicy !== "cache-only" &&
      (fetchPolicy === "network-only" || !STORE.get().has(cacheKey)),
    error: null,
  };
  const [previousRequestKey, setPreviousRequestKey] = useState(requestKey);
  const [result, setResult] = useState(initialResult);

  if (previousRequestKey !== requestKey) {
    setPreviousRequestKey(requestKey);
    setResult(initialResult);
  }
  const notifySuccess = useEffectEvent((value: Data) => onSuccess?.(value));
  const notifyError = useEffectEvent((reason: unknown) => onError?.(reason));

  useEffect(() => {
    if (executionCount === null) return undefined;
    const controller = new AbortController();
    const cache = STORE.get();
    const fromCache = fetchPolicy !== "network-only" && cache.has(cacheKey);

    async function load() {
      let value: Data;
      try {
        if (fromCache) {
          // The caller supplies Data; the cache stores unvalidated JSON.
          // oxlint-disable-next-line typescript/no-unsafe-type-assertion
          value = cache.get(cacheKey) as Data;
        } else {
          if (fetchPolicy === "cache-only") {
            onSettled?.({ data: undefined, loading: false, error: null });
            return;
          }
          const response = await fetch(apiUrl, {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const json: unknown = await response.json();
          if (controller.signal.aborted) return;
          // The generic API describes JSON without runtime validation.
          // oxlint-disable-next-line typescript/no-unsafe-type-assertion
          value = json as Data;
          STORE.set(cacheKey, json);
        }
      } catch (reason: unknown) {
        if (controller.signal.aborted) return;
        const failed = { data: undefined, loading: false, error: reason };
        setResult(failed);
        onSettled?.(failed);
        notifyError(reason);
        return;
      }

      if (controller.signal.aborted) return;
      const loaded = { data: value, loading: false, error: null };
      setResult(loaded);
      onSettled?.(loaded);
      notifySuccess(value);
    }

    void load();
    return () => {
      controller.abort();
    };
  }, [apiUrl, cacheKey, fetchPolicy, executionCount, onSettled]);

  return result;
}
