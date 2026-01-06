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

export interface AllProducts {
  id: string;
  name: string;
  description: string;
  image: string;
  brand: string;
  category: string;
  logo: string;
  availability?: ProductAvailability;
  price: ProductPrice;
}
