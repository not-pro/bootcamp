// @vitest-environment jsdom
import { act } from "react";
import { expect, test, vi } from "vite-plus/test";
import { deferred, key, mountQuery } from "./queryHarness";
import { STORE } from "../src/store";

test("late response cannot replace current query or write cache", async () => {
  const old = deferred<Response>();
  const current = deferred<Response>();
  const fetchMock = vi.fn().mockReturnValueOnce(old.promise).mockReturnValueOnce(current.promise);
  vi.stubGlobal("fetch", fetchMock);
  const onSuccess = vi.fn();
  const query = await mountQuery({ onSuccess });
  await query.render({ endpoint: "/dogs", onSuccess });
  await act(async () => old.resolve(new Response('"cats"')));
  expect(query.result()).toEqual({ data: undefined, loading: true, error: null });
  expect(onSuccess).not.toHaveBeenCalled();
  expect(STORE.get().has(key())).toBe(false);
  expect(fetchMock.mock.calls[0]?.[1].signal.aborted).toBe(true);
  await act(async () => current.resolve(new Response('"dogs"')));
  expect(query.result().data).toBe("dogs");
  expect(STORE.get().get(key("books", "/dogs"))).toBe("dogs");
});

test("callback changes use latest callback without restarting request", async () => {
  const request = deferred<Response>();
  const fetchMock = vi.fn().mockReturnValue(request.promise);
  vi.stubGlobal("fetch", fetchMock);
  const previous = vi.fn();
  const latest = vi.fn();
  const query = await mountQuery({ onSuccess: previous });
  await query.render({ onSuccess: latest });
  expect(fetchMock).toHaveBeenCalledOnce();
  await act(async () => request.resolve(new Response("42")));
  expect(previous).not.toHaveBeenCalled();
  expect(latest).toHaveBeenCalledWith(42);
});

test("new query clears old data and error; policy changes rerun effect", async () => {
  const fetchMock = vi
    .fn()
    .mockResolvedValueOnce(new Response("42"))
    .mockRejectedValueOnce(new Error("offline"));
  vi.stubGlobal("fetch", fetchMock);
  const query = await mountQuery();
  expect(query.result().data).toBe(42);
  await query.render({ queryKey: "other" });
  expect(query.result().data).toBeUndefined();
  expect(query.result().error).toBeInstanceOf(Error);
  await query.render({ queryKey: "other", fetchPolicy: "cache-only" });
  expect(query.result()).toEqual({ data: undefined, loading: false, error: null });
  expect(fetchMock).toHaveBeenCalledTimes(2);
});

test("cache-first miss fetches once and subsequent query reads cache", async () => {
  const fetchMock = vi.fn().mockResolvedValue(new Response("42"));
  vi.stubGlobal("fetch", fetchMock);
  const first = await mountQuery();
  expect(first.result()).toEqual({ data: 42, loading: false, error: null });
  const second = await mountQuery();
  expect(second.result().data).toBe(42);
  expect(fetchMock).toHaveBeenCalledOnce();
});
