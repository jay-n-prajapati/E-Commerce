import { ObjectId } from 'mongoose';

export interface IApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T | null;
}
export interface ISelectItems {
  label: string;
  value: ObjectId;
}
