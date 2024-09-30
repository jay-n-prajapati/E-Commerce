import { IApiResponse } from '@/constants/interfaces';
import { mongoInit } from '@/lib/db/dbConfig';
import Product, { IProduct } from '@/models/product.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    mongoInit();
    const {
      id,
      name,
      description,
      brand,
      price,
      imageUrls,
      thumbnailUrl,
      category,
      tags,
      stockQuantity,
    } = await request.json();

    console.log({ brand });

    if (
      !name ||
      !description ||
      !brand ||
      !imageUrls ||
      !thumbnailUrl ||
      !category ||
      price == null ||
      stockQuantity == null
    ) {
      return NextResponse.json<IApiResponse<IProduct>>({
        status: 400,
        success: false,
        message: 'Please provide valid data!',
        data: null,
      });
    }

    // Validate that thumbnailUrl exists in imageUrls
    if (!imageUrls.includes(thumbnailUrl)) {
      return NextResponse.json<IApiResponse<IProduct>>({
        status: 400,
        success: false,
        message: 'Thumbnail URL must be one of the provided image URLs.',
        data: null,
      });
    }

    // Check for existing product
    let existingProduct;
    if (id) {
      existingProduct = await Product.findById(id);
      if (!existingProduct) {
        return NextResponse.json<IApiResponse<IProduct>>({
          status: 404,
          success: false,
          message: 'Product not found!',
          data: null,
        });
      }
    } else {
      existingProduct = await Product.findOne({ name, category });
      if (existingProduct) {
        return NextResponse.json<IApiResponse<IProduct>>({
          status: 400,
          success: false,
          message: 'Product with the same name and category already exists!',
          data: null,
        });
      }
    }

    const productData = {
      name,
      description,
      brand,
      price,
      imageUrls,
      thumbnailUrl,
      category,
      tags,
      stockQuantity,
    };

    let product;
    if (existingProduct) {
      // Update product
      product = await Product.findByIdAndUpdate(id, productData, { new: true });
    } else {
      // Create new product
      product = new Product(productData);
      await product.save();
    }

    return NextResponse.json<IApiResponse<IProduct>>({
      success: true,
      status: existingProduct ? 200 : 201,
      message: existingProduct
        ? 'Product updated successfully'
        : 'Product added successfully',
      data: product,
    });
  } catch (error) {
    console.log({ error });
    return NextResponse.json<IApiResponse<null>>({
      status: 500,
      success: false,
      message: 'Internal server error',
      data: null,
    });
  }
}
