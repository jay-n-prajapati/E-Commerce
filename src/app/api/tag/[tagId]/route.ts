import { IApiResponse } from '@/constants/interfaces';
import { mongoInit } from '@/lib/db/dbConfig';
import Tag, { ITag } from '@/models/tag.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  _request: NextRequest,
  { params }: { params: { tagId: string } }
) {
  try {
    mongoInit();
    const tag = await Tag.findById(params.tagId);
    return NextResponse.json<IApiResponse<ITag>>({
      success: true,
      status: 200,
      message: '',
      data: tag,
    });
  } catch (error) {
    console.log({ error });
    return NextResponse.json<IApiResponse<null>>({
      success: false,
      status: 500,
      message: 'Internal Server Error',
      data: null,
    });
  }
}
