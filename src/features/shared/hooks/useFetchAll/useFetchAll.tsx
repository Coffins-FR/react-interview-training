import React, { useCallback } from "react";
import axios from "axios";

const useFetchAll = <T,>(urls: string[]) => {
  const [data, setData] = React.useState<(T | null)[]>(
    Array(urls.length).fill(null)
  );
  const [loading, setLoading] = React.useState<boolean[]>(
    Array(urls.length).fill(true)
  );
  const [errors, setErrors] = React.useState<(string | null)[]>(
    Array(urls.length).fill(null)
  );

  const fetchData = useCallback(async () => {
    const requests = urls.map((url, index) =>
      axios
        .get(url)
        .then((response) => {
          setData((prevData) => {
            const newData = [...prevData];
            newData[index] = response.data;
            return newData;
          });
        })
        .catch((err) => {
          setErrors((prevErrors) => {
            const newErrors = [...prevErrors];
            newErrors[index] = err.message;
            return newErrors;
          });
        })
        .finally(() => {
          setLoading((prevLoading) => {
            const newLoading = [...prevLoading];
            newLoading[index] = false;
            return newLoading;
          });
        })
    );

    await Promise.all(requests);
  }, [urls]);

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, errors };
};

export default useFetchAll;
