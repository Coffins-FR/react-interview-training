import { renderHook, waitFor } from "@testing-library/react";
import useFetch from "./useFetch";
import axios from "axios";
import { vi, expect, it, afterEach, describe } from "vitest";

vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

describe("useFetch", () => {
  const url = "https://jsonplaceholder.typicode.com/todos/";
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should set loading true initially and fetch data", async () => {
    const mockData = { foo: "bar" };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useFetch<typeof mockData>(url));
    // Initially loading is true
    expect(result.current.loading).toBe(true);
    // Wait for hook to update after fetch
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("should set error if fetch fails", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useFetch<{ foo?: string }>(url));
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBe(errorMessage);
  });

  it("should refetch when url changes", async () => {
    const firstData = { a: 1 };
    const secondData = { b: 2 };
    mockedAxios.get.mockResolvedValueOnce({ data: firstData });
    const { result, rerender } = renderHook(
      ({ url }) => useFetch<typeof firstData | typeof secondData>(url),
      { initialProps: { url } }
    );
    await waitFor(() => expect(result.current.data).toEqual(firstData));
    mockedAxios.get.mockResolvedValueOnce({ data: secondData });
    rerender({ url: "https://jsonplaceholder.typicode.com/posts" });
    await waitFor(() => expect(result.current.data).toEqual(secondData));
  });
});
