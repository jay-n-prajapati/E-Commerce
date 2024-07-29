import { mongoInit } from '@/lib/db/dbConfig';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

mongoInit();

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return NextResponse.json({
        message: 'user already exist',
        status: 400,
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
      message: 'User registered succesfully!',
      user: savedUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
