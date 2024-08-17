import { IApiResponse } from '@/constants/interfaces';
import { mongoInit } from '@/lib/db/dbConfig';
import Category, { ICategory } from '@/models/category.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    mongoInit();
    const { name, slug } = await request.json();

    if (!name || !slug) {
      return NextResponse.json<IApiResponse<ICategory>>({
        status: 400,
        success: false,
        message: 'Please provide valid data!',
        data: null,
      });
    }

    const existSlug = await Category.findOne({ slug });

    if (existSlug) {
      return NextResponse.json<IApiResponse<ICategory>>({
        status: 400,
        success: false,
        message: 'Slug Already Exist!',
        data: null,
      });
    }

    const category = new Category({
      name,
      slug,
    });
    const data = await category.save();

    return NextResponse.json<IApiResponse<ICategory>>({
      success: true,
      status: 201,
      message: 'Category added successfully',
      data,
    });
  } catch (error) {
    console.log({ error });
  }
}
