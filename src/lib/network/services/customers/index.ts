import { IApiResponse } from '@/constants/interfaces';
import { axiosInstance } from '../..';
import { IUser } from '@/models/user.model';

export const getAllCustomers = async () => {
  const { data } = await axiosInstance.get<IApiResponse<IUser[]>>('/customers');
  return data.data;
};
