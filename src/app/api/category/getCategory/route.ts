import { IApiResponse } from '@/constants/interfaces';
import { mongoInit } from '@/lib/db/dbConfig';
import Category, { ICategory } from '@/models/category.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { id } = await request.json();
  try {
    mongoInit();
    const category = await Category.findById(id);
    return NextResponse.json<IApiResponse<ICategory>>({
      success: true,
      status: 200,
      message: '',
      data: category,
    });
  } catch (error) {
    console.log({ error });
    return NextResponse.json<IApiResponse<ICategory>>({
      success: false,
      status: 500,
      message: 'Internal Server Error',
      data: null,
    });
  }
}
