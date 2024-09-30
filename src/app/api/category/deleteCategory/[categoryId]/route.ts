import { IApiResponse } from '@/constants/interfaces';
import { mongoInit } from '@/lib/db/dbConfig';
import Category, { ICategory } from '@/models/category.model';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    mongoInit();
    const deletedCat = await Category.findByIdAndDelete(params.categoryId);

    if (deletedCat) {
      return NextResponse.json<IApiResponse<null>>({
        success: true,
        status: 204,
        message: 'Category Deleted Successfully',
        data: null,
      });
    }

    return NextResponse.json<IApiResponse<null>>({
      success: false,
      status: 400,
      message: 'Something went wrong',
      data: null,
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
