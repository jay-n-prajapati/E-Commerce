import { IApiResponse } from '@/constants/interfaces';
import { mongoInit } from '@/lib/db/dbConfig';
import Tag from '@/models/tag.model';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { tagId: string } }
) {
  try {
    await mongoInit();
    const id = params.tagId;

    const deletedTag = await Tag.findByIdAndDelete(id);

    if (deletedTag) {
      return NextResponse.json<IApiResponse<null>>({
        status: 204,
        success: true,
        message: 'Tag Deleted Successfully',
        data: null,
      });
    }

    return NextResponse.json<IApiResponse<null>>({
      status: 400,
      success: false,
      message: 'Something went wrong',
      data: null,
    });
  } catch (error) {
    return NextResponse.json<IApiResponse<null>>({
      status: 500,
      success: false,
      message: 'Internal server error',
      data: null,
    });
  }
}
