import { useState, useMemo } from "react";

import Input from "../../shared/components/Input";

import useFetchAll from "../../shared/hooks/useFetchAll/useFetchAll";

import {
  isProductArray,
  isProductPriceArray,
  isProductAvailabilityArray,
} from "../predicate";

import type {
  ProductAvailabilityResponse,
  ProductPriceResponse,
  ProductsResponse,
} from "../interface";

const Autocomplete = () => {
  const [suggestions, setSuggestions] = useState<ProductsResponse>([]);

  const {
    data: [products, availability, prices],
    loading,
    errors,
  } = useFetchAll<
    ProductsResponse | ProductAvailabilityResponse | ProductPriceResponse
  >([
    "/mock/autocomplete/all-products.json",
    "/mock/autocomplete/product-availability.json",
    "/mock/autocomplete/product-prices.json",
  ]);

  const arraysFusion = useMemo(() => {
    if (
      isProductArray(products) &&
      isProductAvailabilityArray(availability) &&
      isProductPriceArray(prices)
    ) {
      return products.reduce((acc, current) => {
        const availabilityItem = availability.find(
          (avail) => avail.productId === current.id
        );
        const priceItem = prices.find(
          (price) => price.productId === current.id
        );

        return [...acc, { ...current, ...availabilityItem, ...priceItem }];
      }, [] as ProductsResponse);
    }
  }, [products, availability, prices]);

  if (loading.some((l) => l)) return <div>Loading...</div>;
  if (errors.some((e) => e)) return <div>Error: {errors.find((e) => e)}</div>;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle input change
    const value = event.currentTarget.value;
    const handled = setTimeout(() => {
      if (!value) {
        setSuggestions([]);
        return;
      }

      setSuggestions(
        arraysFusion!.filter(
          (product) =>
            product.name.toLowerCase().includes(value.toLowerCase()) ||
            product.description.toLowerCase().includes(value.toLowerCase())
        )
      );
    }, 500);

    return () => clearTimeout(handled);
  };

  console.log("Suggestions:", suggestions);

  return (
    <div className="p-8">
      <Input
        className="w-1/2"
        onChange={(e) => handleChange(e)}
        label="Autocomplete"
      />
    </div>
  );
};

export default Autocomplete;
