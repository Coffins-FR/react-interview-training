import { useRef, useState } from "react";

import Input from "../../components/Input";
import useFetchAll from "../../hooks/useFetchAll";

import type {
  ProductAvailability,
  ProductPrice,
  AllProducts,
} from "./interface";

const Autocomplete = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<AllProducts[]>([]);

  const {
    data: [products, availability, prices],
    loading,
    errors,
  } = useFetchAll<AllProducts | ProductAvailability | ProductPrice>([
    "/mock/autocomplete/all-products.json",
    "/mock/autocomplete/product-availability.json",
    "/mock/autocomplete/product-prices.json",
  ]);

  if (loading.some((l) => l)) return <div>Loading...</div>;
  if (errors.some((e) => e)) return <div>Error: {errors.find((e) => e)}</div>;

  const handleChange = () => {
    // Handle input change
    const value = inputRef.current?.value;
    if (!value) {
      setSuggestions([]);
      return;
    }

    const filteredProducts = (products as unknown as AllProducts[]).filter(
      (product) => product.name.toLowerCase().includes(value.toLowerCase())
    );

    // Enrich products with availability and price
    const enrichedProducts = filteredProducts.map((product) => {
      const productAvailability = (
        availability as unknown as ProductAvailability[]
      ).find((avail) => avail.productId === product.id);
      const productPrice = (prices as unknown as ProductPrice[]).find(
        (price) => price.productId === product.id
      );

      return {
        ...product,
        availability: productAvailability,
        price: productPrice!,
      };
    });

    setSuggestions(enrichedProducts);
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
