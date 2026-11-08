// @vitest-environment jsdom
import { expect, test, vi } from "vite-plus/test";
import { key, mountQuery } from "./queryHarness";
import { STORE } from "../src/store";

test.each([0, false, "", null])("reads cached %j without a request", async (value) => {
  STORE.set(key(), value);
  const fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  const onSuccess = vi.fn();
  const query = await mountQuery({ onSuccess });
  expect(query.result()).toEqual({ data: value, loading: false, error: null });
  expect(fetchMock).not.toHaveBeenCalled();
  expect(onSuccess).toHaveBeenCalledWith(value);
});

test("cache-only miss does not fetch", async () => {
  const fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  const query = await mountQuery({ fetchPolicy: "cache-only" });
  expect(query.result()).toEqual({ data: undefined, loading: false, error: null });
  expect(fetchMock).not.toHaveBeenCalled();
});

test("network-only bypasses existing cache", async () => {
  STORE.set(key(), "old");
  const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify("new")));
  vi.stubGlobal("fetch", fetchMock);
  const query = await mountQuery({ fetchPolicy: "network-only" });
  expect(query.result().data).toBe("new");
  expect(STORE.get().get(key())).toBe("new");
  expect(fetchMock).toHaveBeenCalledWith(
    "https://example.test/books",
    expect.objectContaining({
      cache: "no-store",
      signal: expect.any(AbortSignal),
    }),
  );
});

test.each(["http", "network", "json"])("handles %s failure without success", async (kind) => {
  const failure = new Error("Invalid data");
  const fetchMock = vi
    .fn()
    .mockResolvedValue(
      kind === "http"
        ? new Response("", { status: 404 })
        : new Response(kind === "json" ? "{" : "42"),
    );
  if (kind === "network") fetchMock.mockRejectedValue(failure);
  vi.stubGlobal("fetch", fetchMock);
  const onSuccess = vi.fn();
  const onError = vi.fn();
  const query = await mountQuery({
    onSuccess,
    onError,
  });
  expect(query.result().error).toBeInstanceOf(Error);
  expect(query.result().loading).toBe(false);
  expect(query.result().data).toBeUndefined();
  expect(onSuccess).not.toHaveBeenCalled();
  expect(onError).toHaveBeenCalledOnce();
  expect(STORE.get().has(key())).toBe(false);
});
