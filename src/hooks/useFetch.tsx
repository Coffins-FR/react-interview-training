import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get<T>(url);
      setData(response.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const memoizedFetchData = useCallback(fetchData, [url]);
  useEffect(() => {
    memoizedFetchData();
  }, [url, memoizedFetchData]);
  return { data, loading, error };
};

export default useFetch;
