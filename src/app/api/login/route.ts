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
      message: 'User does not exists!',
    });
  }
  const isValidPassword = await bcrypt.compare(password, existedUser.password);
  if (!isValidPassword) {
    return NextResponse.json({
      message: 'Invalid credentials!',
      status: 400,
    });
  }

  return NextResponse.json({
    message: 'Login successful!',
    status: 200,
    user: existedUser,
  });
}
