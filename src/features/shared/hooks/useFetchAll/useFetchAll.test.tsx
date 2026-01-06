import { renderHook } from "@testing-library/react";
import useFetchAll from "./useFetchAll";
import axios from "axios";
import { vi, expect, it, afterEach, describe } from "vitest";

vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

describe("useFetchAll", () => {
  const urls = [
    "https://jsonplaceholder.typicode.com/todos/",
    "https://jsonplaceholder.typicode.com/posts/",
  ];

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch data for all URLs and update state", async () => {
    const mockData1 = { foo: "bar1" };
    const mockData2 = { foo: "bar2" };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData1 });
    mockedAxios.get.mockResolvedValueOnce({ data: mockData2 });

    const { result } = renderHook(() => useFetchAll<typeof mockData1>(urls));

    // Initially loading should be true for all
    expect(result.current.loading).toEqual([true, true]);
    expect(result.current.data).toEqual([null, null]);
    expect(result.current.errors).toEqual([null, null]);

    // Wait for all requests to complete
    await vi.waitFor(() => {
      expect(result.current.loading).toEqual([false, false]);
      expect(result.current.data).toEqual([mockData1, mockData2]);
      expect(result.current.errors).toEqual([null, null]);
    });
  });

  it("should handle errors for failed requests", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockResolvedValueOnce({ data: { foo: "bar1" } });
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useFetchAll<unknown>(urls));

    // Initially loading should be true for all
    expect(result.current.loading).toEqual([true, true]);
    expect(result.current.data).toEqual([null, null]);
    expect(result.current.errors).toEqual([null, null]);

    // Wait for all requests to complete
    await vi.waitFor(() => {
      expect(result.current.loading).toEqual([false, false]);
      expect(result.current.data).toEqual([{ foo: "bar1" }, null]);
      expect(result.current.errors).toEqual([null, errorMessage]);
    });
  });

  it("should refetch data when URLs change", async () => {
    const firstData = { foo: "bar1" };
    const secondData = { foo: "bar2" };
    const newUrls = [
      "https://jsonplaceholder.typicode.com/todos/3",
      "https://jsonplaceholder.typicode.com/posts/4",
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: firstData });
    mockedAxios.get.mockResolvedValueOnce({ data: secondData });

    const { result, rerender } = renderHook(
      ({ urls }) => useFetchAll<typeof firstData | typeof secondData>(urls),
      { initialProps: { urls } }
    );

    await vi.waitFor(() => {
      expect(result.current.data).toEqual([firstData, secondData]);
    });

    const thirdData = { foo: "bar3" };
    const fourthData = { foo: "bar4" };
    mockedAxios.get.mockResolvedValueOnce({ data: thirdData });
    mockedAxios.get.mockResolvedValueOnce({ data: fourthData });

    rerender({ urls: newUrls });
    await vi.waitFor(() => {
      expect(result.current.data).not.toEqual([thirdData, fourthData]);
    });
  });
});
