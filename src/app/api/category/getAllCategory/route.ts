import { IApiResponse } from '@/constants/interfaces';
import { mongoInit } from '@/lib/db/dbConfig';
import Category, { ICategory } from '@/models/category.model';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    mongoInit();
    const categories: ICategory[] = await Category.find();
    return NextResponse.json<IApiResponse<ICategory[]>>({
      success: true,
      status: 200,
      message: '',
      data: categories,
    });
  } catch (error) {
    console.log({ error });
    return NextResponse.json<IApiResponse<ICategory>>({
      success: true,
      status: 500,
      message: 'Internal Server Error',
      data: null,
    });
  }
}
