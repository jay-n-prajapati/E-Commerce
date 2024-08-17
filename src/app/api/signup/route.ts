import { mongoInit } from '@/lib/db/dbConfig';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    mongoInit();
    const { name, email, password } = await request.json();

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return NextResponse.json({
        success: false,
        message: 'User already exist',
        status: 400,
        user: null,
      });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPass,
    });
    const savedUser = await newUser.save();
    return NextResponse.json({
      success: true,
      message: 'User registered successfully!',
      status: 201,
      user: savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
      status: 500,
      user: null,
    });
  }
}
