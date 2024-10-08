import { NextRequest, NextResponse } from 'next/server';
import { getProductsFilters } from '../_services/product';
import Product from '@/models/product.model';
import { IApiResponse, ProductListData } from '@/constants/interfaces';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const { searchQuery, sortQuery, page, limit, skip } =
    getProductsFilters(searchParams);

  console.log('getting requestsss');

  try {
    const products = await Product.find(searchQuery)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    const result = await Product.findOne().sort({ price: -1 }).select('price');
    const totalProducts = await Product.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalProducts / limit);

    return NextResponse.json<IApiResponse<ProductListData>>({
      data: {
        products,
        maxPrice: result?.price ?? 100000,
        pagination: { page, limit, totalPages, totalProducts },
      },
      success: true,
      status: 200,
      message: 'success',
    });
  } catch (error) {
    console.log({ error });
    return NextResponse.json<IApiResponse<null>>({
      data: null,
      message: 'error',
      status: 500,
      success: false,
    });
  }
}
