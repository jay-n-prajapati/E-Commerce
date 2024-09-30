import { IApiResponse } from '@/constants/interfaces';
import { axiosInstance } from '../..';
import { ICategory } from '@/models/category.model';

export const getCategories = async () => {
  const { data } = await axiosInstance.get<IApiResponse<ICategory[]>>(
    '/category/getAllCategory'
  );
  return data.data;
};

export const getCategory = async (id: string) => {
  const { data } = await axiosInstance.post<IApiResponse<ICategory>>(
    `/category/${id}`
  );
  return data.data;
};

export const createCategory = async (name: string, slug: string) => {
  const { data } = await axiosInstance.post<IApiResponse<ICategory>>(
    '/category/addCategory',
    {
      name,
      slug,
    }
  );
  return data;
};

export const editCategory = async (id: string, name: string, slug: string) => {
  const { data } = await axiosInstance.patch<IApiResponse<ICategory>>(
    '/category/editCategory',
    {
      id,
      name,
      slug,
    }
  );
  return data;
};

export const deleteCategory = async (id: string) => {
  const { data } = await axiosInstance.delete<IApiResponse<null>>(
    `/category/deleteCategory/${id}`
  );
  return data;
};
