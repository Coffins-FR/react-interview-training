import { useRef } from "react";
import useFetch from "../../shared/hooks/useFetch/useFetch";
import useIntersectionObserver from "../../shared/hooks/useIntersectionObserver";
import useLocalStorage from "../../shared/hooks/useLocalStorage";

type DogImage = {
  message: string[];
  status: string;
};

const NUMBER_OF_IMAGES_TO_FETCH = 10;

const Dogo = () => {
  const { data, error, loading, refetch } = useFetch<DogImage>(
    "https://dog.ceo/api/breeds/image/random/" + NUMBER_OF_IMAGES_TO_FETCH
  );
  const ref = useRef(null);

  const [, setStoredImages, getStoredImagesToFetch] = useLocalStorage<
    DogImage["message"]
  >("dogo-images-to-fetch", []);

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.9,
  };

  useIntersectionObserver({
    ref,
    options,
    callback: (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setStoredImages((prev) => [...prev, ...(data?.message || [])]);
          refetch();
        }
      });
    },
  });

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-screen h-screen overflow-y-scroll p-8 flex flex-col items-center bg-slate-800">
      {getStoredImagesToFetch().map((dogUrl: string, index: number) => (
        <div key={index} className="mb-4 ">
          <img
            src={dogUrl}
            alt={`Dog ${index}`}
            className="w-64 h-64 object-cover rounded-md shadow-md"
          />
        </div>
      ))}
      {loading && <div>Loading...</div>}
      {!loading && (
        <div className="w-full h-4 bg-yellow-500 block" ref={ref}></div>
      )}
    </div>
  );
};

export default Dogo;
