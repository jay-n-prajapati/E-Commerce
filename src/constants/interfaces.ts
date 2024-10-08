import { IProduct } from '@/models/product.model';

export interface IApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T | null;
}
export interface ISelectItems {
  label: string;
  value: string;
}

export interface ProductListData {
  products: IProduct[];
  maxPrice: number;
  pagination: {
    page?: string | number;
    limit?: string | number;
    totalPages?: string | number;
    totalProducts?: number;
  };
}
