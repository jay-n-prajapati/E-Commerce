import { IApiResponse } from '@/constants/interfaces';
import { mongoInit } from '@/lib/db/dbConfig';
import Product, { IProduct } from '@/models/product.model';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    mongoInit();
    const deletedCat = await Product.findByIdAndDelete(params.productId);

    if (deletedCat) {
      return NextResponse.json<IApiResponse<IProduct>>({
        success: true,
        status: 204,
        message: 'Product Deleted Successfully',
        data: null,
      });
    }

    return NextResponse.json<IApiResponse<IProduct>>({
      success: false,
      status: 400,
      message: 'Something went wrong',
      data: null,
    });
  } catch (error) {
    console.log({ error });
    return NextResponse.json<IApiResponse<IProduct>>({
      success: false,
      status: 500,
      message: 'Internal Server Error',
      data: null,
    });
  }
}
