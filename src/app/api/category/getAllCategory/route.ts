import { IApiResponse } from '@/constants/interfaces';
import { mongoInit } from '@/lib/db/dbConfig';
import Category, { ICategory } from '@/models/category.model';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    mongoInit();
    const categories = await Category.find();
    return NextResponse.json<IApiResponse<ICategory>>({
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
