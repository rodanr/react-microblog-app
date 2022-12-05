import { useState, useEffect } from "react";
//custom fetch hook
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const getData = async () => {
      try {
        const res = await fetch(url, { signal: abortController.signal });
        if (!res.ok) {
          setIsPending(false);
          throw Error("Could not fetch the data for that resource");
        }
        const data = await res.json();
        setIsPending(false);
        setData(data);
        setError(null);
      } catch (error) {
        if (!error.name === "AbortError") {
          setIsPending(false);
          setError(error.message);
        }
      }
    };

    getData();
    return () => abortController.abort();
  }, [url]);

  return { data, isPending, error };
};
export default useFetch;
