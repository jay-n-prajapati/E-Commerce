import { IApiResponse } from '@/constants/interfaces';
import { mongoInit } from '@/lib/db/dbConfig';
import Product, { IProduct } from '@/models/product.model';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(
  request: NextApiRequest,
  { params }: { params: { productId: string } }
) {
  try {
    mongoInit();
    const product = await Product.findById(params.productId);
    if (!product) {
      return NextResponse.json<IApiResponse<IProduct>>({
        status: 400,
        success: false,
        message: 'Oops, Product Not found',
        data: null,
      });
    }

    return NextResponse.json<IApiResponse<IProduct>>({
      status: 200,
      success: true,
      message: 'Product found',
      data: product,
    });
  } catch (error) {
    return NextResponse.json<IApiResponse<IProduct>>({
      status: 500,
      success: false,
      message: 'Internal Server error',
      data: null,
    });
  }
}
