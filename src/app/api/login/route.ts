import { mongoInit } from '@/lib/db/dbConfig';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

mongoInit();

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  
  const existedUser = await User.findOne({ email });
  if (!existedUser) {
    return NextResponse.json({
      success: false,
      message: 'User does not exists!',
      user: null,
      status: 400,
    });
  }

  if (!existedUser.password) {
    return NextResponse.json({
      success: false,
      message: 'Invalid credentials!',
      user: null,
      status: 400,
    });
  }

  const isValidPassword = await bcrypt.compare(password, existedUser.password);
  // const isValidPassword = password === existedUser.password;
  if (!isValidPassword) {
    return NextResponse.json({
      success: false,
      message: 'Invalid credentials!',
      user: null,
      status: 400,
    });
  }

  return NextResponse.json({
    success: true,
    message: 'Login successful!',
    status: 200,
    user: existedUser,
  });
}
