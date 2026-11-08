import type { BaseUrl, Cache, CacheTTL, QueryKey } from "./types";

// todo: implement cache expiry using cacheTimeToLiveMS.
// todo: gc?
class Store {
  readonly config = { baseUrl: "" };
  cacheTimeToLiveMS: CacheTTL = 0;
  cache: Cache = new Map();

  get(): Cache {
    return this.cache;
  }

  set(key: QueryKey, value: unknown): Cache {
    return this.cache.set(key, value);
  }

  setBaseUrl(baseUrl: BaseUrl): BaseUrl {
    this.config.baseUrl = baseUrl;
    return baseUrl;
  }

  getBaseUrl(): BaseUrl {
    return this.config.baseUrl;
  }
}
export const STORE = new Store();
