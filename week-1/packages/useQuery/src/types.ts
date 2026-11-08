type QueryKey = string;
type CacheValue = unknown;
type CacheTTL = number;
type BaseUrl = string;
type Cache = Map<QueryKey, CacheValue>;
type Nullable<T> = T | null | undefined;

export interface QueryOptions<Data> {
  queryKey: QueryKey;
  endpoint: string;
  onError?: (error: unknown) => void;
  onSuccess?: (data: Data) => void;
  /**
   * cache-first возвращает запись из кеша, а при её отсутствии делает запрос.
   * cache-only читает только кеш; при промахе данные остаются undefined, ошибки нет.
   * network-only всегда делает запрос, минуя HTTP-кеш.
   * @default "cache-first"
   */
  fetchPolicy?: "cache-first" | "cache-only" | "network-only";
}

export interface QueryResult<Data> {
  data: Data | undefined;
  loading: boolean;
  error: unknown;
}

export type { QueryKey, CacheValue, CacheTTL, BaseUrl, Cache, Nullable };
