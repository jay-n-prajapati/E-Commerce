import { IApiResponse } from '@/constants/interfaces';
import { axiosInstance } from '../..';
import { IProduct } from '@/models/product.model';

export const getProducts = async () => {
  const { data } = await axiosInstance.get<IApiResponse<IProduct[]>>(
    '/products/getAllProduct'
  );
  return data.data;
};

export const getProduct = async (productId: string) => {
  try {
    const { data } = await axiosInstance.get<IApiResponse<IProduct>>(
      `/products/${productId}`
    );
    return data.data;
  } catch (error) {
    console.log({ error });
  }
};

export const postProduct = async (product: IProduct) => {
  try {
    const {
      id,
      name,
      description,
      price,
      imageUrls,
      thumbnailUrl,
      category,
      brand,
      tags,
      stockQuantity,
    } = product;

    const { data } = await axiosInstance.post<IApiResponse<IProduct>>(
      '/products/saveProduct',
      {
        id,
        name,
        description,
        brand,
        price,
        imageUrls,
        thumbnailUrl,
        category,
        tags,
        stockQuantity,
      }
    );

    return data;
  } catch (error) {
    console.error('Error upserting product:', error);
    return null;
  }
};

export const deleteProduct = async (id: string) => {
  const { data } = await axiosInstance.delete<IApiResponse<IProduct>>(
    `/products/deleteProduct/${id}`
  );
  return data;
};
