import { IApiResponse } from '@/constants/interfaces';
import { mongoInit } from '@/lib/db/dbConfig';
import Tag, { ITag } from '@/models/tag.model';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await mongoInit();
    const tags = await Tag.find();

    return NextResponse.json<IApiResponse<ITag[]>>({
      data: tags,
      message: '',
      status: 200,
      success: true,
    });
  } catch (error) {
    console.log({ error });

    return NextResponse.json<IApiResponse<null>>({
      data: null,
      message: 'Internal Server error',
      status: 500,
      success: false,
    });
  }
}
