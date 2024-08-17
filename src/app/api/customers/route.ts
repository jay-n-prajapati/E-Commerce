import { mongoInit } from '@/lib/db/dbConfig';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    mongoInit();
    const customers = await User.find();
    return NextResponse.json({
      success: true,
      status: 200,
      data: customers,
    });
  } catch (error) {
    console.log(error);
  }
}
