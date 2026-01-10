import type {
  ProductsResponse,
  ProductAvailabilityResponse,
  ProductPriceResponse,
} from "./interface";
import {} from "./interface";

export function isProductArray(data: unknown): data is ProductsResponse {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "name" in item
    )
  );
}

export function isProductAvailabilityArray(
  data: unknown
): data is ProductAvailabilityResponse {
  return (
    Array.isArray(data) &&
    data.every(
      (item) => typeof item === "object" && item !== null && "productId" in item
    )
  );
}

export function isProductPriceArray(
  data: unknown
): data is ProductPriceResponse {
  return (
    Array.isArray(data) &&
    data.every(
      (item) => typeof item === "object" && item !== null && "productId" in item
    )
  );
}
