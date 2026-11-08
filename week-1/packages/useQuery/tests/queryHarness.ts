import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, vi } from "vite-plus/test";
import { useQuery } from "../src/useQuery";
import type { QueryOptions, QueryResult } from "../src/types";
import { STORE } from "../src/store";

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
const cleanups: Array<() => void> = [];
export const key = (queryKey = "books", endpoint = "/books") =>
  JSON.stringify([queryKey, `https://example.test${endpoint}`]);

beforeEach(() => {
  STORE.get().clear();
  STORE.setBaseUrl("https://example.test");
});
afterEach(async () => {
  await act(async () => {
    for (const cleanup of cleanups.splice(0)) cleanup();
  });
  vi.unstubAllGlobals();
});

export async function mountQuery(overrides: Partial<QueryOptions<unknown>> = {}) {
  let latest: QueryResult<unknown> | undefined;
  const container = document.createElement("div");
  const root = createRoot(container);
  const defaults: QueryOptions<unknown> = {
    queryKey: "books",
    endpoint: "/books",
  };
  function Probe(props: QueryOptions<unknown>) {
    latest = useQuery(props);
    return null;
  }
  async function render(options: Partial<QueryOptions<unknown>>) {
    await act(async () => root.render(createElement(Probe, { ...defaults, ...options })));
  }
  cleanups.push(() => root.unmount());
  await render(overrides);
  return {
    render,
    result() {
      if (!latest) throw new Error("Query has not rendered");
      return latest;
    },
  };
}

export function deferred<Value>() {
  let resolve!: (value: Value) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<Value>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}
