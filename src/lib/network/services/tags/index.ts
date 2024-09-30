import { IApiResponse } from '@/constants/interfaces';
import { axiosInstance } from '../..';
import { ITag } from '@/models/tag.model';

export const getTags = async () => {
  const { data } =
    await axiosInstance.get<IApiResponse<ITag[]>>('/tag/getAllTags');
  return data.data;
};

export const getTag = async (id: string) => {
  const { data } = await axiosInstance.post<IApiResponse<ITag>>(`/tag/${id}`);
  return data.data;
};

export const saveTag = async (
  name: string,
  description: string,
  id?: string
) => {
  const { data } = await axiosInstance.post<IApiResponse<ITag>>(
    '/tag/saveTag',
    {
      id,
      name,
      description,
    }
  );

  return data;
};

export const deletedTag = async (id: string) => {
  const { data } = await axiosInstance.delete<IApiResponse<null>>(
    `/tag/deleteTag/${id}`
  );

  return data;
};
