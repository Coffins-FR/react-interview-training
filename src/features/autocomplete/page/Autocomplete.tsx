import { useRef, useState, useMemo } from "react";

import Input from "../../shared/components/Input";
import useFetchAll from "../../shared/hooks/useFetchAll/useFetchAll";
import useFetch from "../../shared/hooks/useFetch/useFetch";

import type {
  ProductAvailabilityResponse,
  ProductPriceResponse,
  ProductsResponse,
} from "./interface";

const Autocomplete = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<ProductsResponse>([]);

  const { data: products } = useFetch<ProductsResponse>(
    "/mock/autocomplete/all-products.json"
  );

  const {
    data: [availability, prices],
    loading,
    errors,
  } = useFetchAll<ProductAvailabilityResponse | ProductPriceResponse>([
    "/mock/autocomplete/all-products.json",
    "/mock/autocomplete/product-availability.json",
    "/mock/autocomplete/product-prices.json",
  ]);

  const arraysFusion = useMemo(() => {
    return products?.reduce((acc, current) => {
      const availabilityItem = availability?.find(
        (avail) => avail.productId === current.id
      );
      const priceItem = prices.find((price) => price.productId === current.id);
      acc.push({
        ...current,
        ...availabilityItem,
        ...priceItem!,
      });
      return acc;
    }, [] as ProductsResponse);
  }, [products, availability, prices]);

  if (loading.some((l) => l)) return <div>Loading...</div>;
  if (errors.some((e) => e)) return <div>Error: {errors.find((e) => e)}</div>;

  console.log("Merged Data:", arraysFusion);

  const handleChange = () => {
    // Handle input change
    const value = inputRef.current?.value;
    if (!value) {
      setSuggestions([]);
      return;
    }

    setSuggestions(
      arraysFusion!.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  console.log("Suggestions:", suggestions);

  return (
    <div className="p-8">
      <Input
        className="w-1/2"
        ref={inputRef}
        onChange={() => handleChange()}
        label="Autocomplete"
      />
    </div>
  );
};

export default Autocomplete;
