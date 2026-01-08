export interface ProductAvailability {
  productId: string;
  available: boolean;
  stock: number;
}

export interface ProductPrice {
  productId: string;
  price: number;
  currency: string;
}

export interface Product
  extends Partial<Omit<ProductPrice, "productId">>,
    Partial<Omit<ProductAvailability, "productId">> {
  id: string;
  name: string;
  description: string;
  image: string;
  brand: string;
  category: string;
  logo: string;
}

export type ProductsResponse = Product[];
export type ProductAvailabilityResponse = ProductAvailability[];
export type ProductPriceResponse = ProductPrice[];
