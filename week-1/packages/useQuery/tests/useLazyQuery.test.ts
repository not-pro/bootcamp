// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { expect, test, vi } from "vite-plus/test";
import { useLazyQuery } from "../src/useLazyQuery";
import { deferred, key } from "./queryHarness";
import { STORE } from "../src/store";

test("lazy query waits for execution and cancels the previous request on repeat", async () => {
  const first = deferred<Response>();
  const second = deferred<Response>();
  const fetchMock = vi.fn().mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise);
  vi.stubGlobal("fetch", fetchMock);
  const onSuccess = vi.fn();
  let query: ReturnType<typeof useLazyQuery<number>> | undefined;
  function Probe() {
    query = useLazyQuery<number>({
      endpoint: "/books",
      queryKey: "books",
      fetchPolicy: "network-only",
      onSuccess,
    });
    return null;
  }
  const root = createRoot(document.createElement("div"));
  try {
    await act(async () => root.render(createElement(Probe)));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(query?.[1]).toEqual({ data: undefined, loading: false, error: null });
    await act(async () => query?.[0]());
    expect(query?.[1].loading).toBe(true);
    await act(async () => query?.[0]());
    expect(fetchMock.mock.calls[0]?.[1].signal.aborted).toBe(true);
    await act(async () => first.resolve(new Response("1")));
    expect(onSuccess).not.toHaveBeenCalled();
    expect(STORE.get().has(key())).toBe(false);
    await act(async () => second.resolve(new Response("2")));
    expect(query?.[1]).toEqual({ data: 2, loading: false, error: null });
    expect(onSuccess).toHaveBeenCalledExactlyOnceWith(2);
  } finally {
    await act(async () => root.unmount());
  }
});
