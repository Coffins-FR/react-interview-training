export interface ProductAvailability {
  productId: number;
  available: boolean;
  stock: number;
}

export interface ProductPrice {
  productId: number;
  price: number;
  currency: string;
}

export interface AllProducts {
  id: number;
  name: string;
  description: string;
  image: string;
  brand: string;
  category: string;
  logo: string;
  availability?: ProductAvailability;
  price: ProductPrice;
}
