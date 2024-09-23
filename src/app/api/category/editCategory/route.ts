import { IApiResponse } from '@/constants/interfaces';
import { mongoInit } from '@/lib/db/dbConfig';
import Category, { ICategory } from '@/models/category.model';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  const { id, name, slug } = await request.json();
  try {
    mongoInit();

    const existCategories = await Category.find({ $or: [{ name }, { slug }] });

    if (existCategories.length !== 0) {
      return NextResponse.json<IApiResponse<ICategory>>({
        status: 400,
        success: false,
        message: 'Name or Slug Already Exist!',
        data: null,
      });
    }

    const upDatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        name,
        slug,
      },
      { new: true }
    );
    return NextResponse.json<IApiResponse<ICategory>>({
      success: true,
      status: 204,
      message: 'Category Updated Successfully',
      data: upDatedCategory,
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
