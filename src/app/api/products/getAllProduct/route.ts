import { NextResponse } from 'next/server';
import { mongoInit } from '@/lib/db/dbConfig';
import Product, { IProduct } from '@/models/product.model';
import { IApiResponse } from '@/constants/interfaces';

export async function GET() {
  try {
    await mongoInit();

    const products: IProduct[] = await Product.find();

    return NextResponse.json<IApiResponse<IProduct[]>>({
      success: true,
      status: 200,
      message: 'Products fetched successfully',
      data: products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);

    return NextResponse.json<IApiResponse<null>>({
      success: false,
      status: 500,
      message: 'An error occurred while fetching products',
      data: null,
    });
  }
}
