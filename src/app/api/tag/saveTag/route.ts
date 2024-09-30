import { IApiResponse } from '@/constants/interfaces';
import { mongoInit } from '@/lib/db/dbConfig';
import Tag, { ITag } from '@/models/tag.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await mongoInit();
    const { id, name, description } = await request.json();

    // check for existing tag
    let existingTag;
    if (id) {
      existingTag = await Tag.findById(id);
      if (!existingTag) {
        return NextResponse.json<IApiResponse<ITag>>({
          status: 404,
          success: false,
          message: 'Tag not found!',
          data: null,
        });
      }
    } else {
      existingTag = await Tag.findOne({ name });
      if (existingTag) {
        return NextResponse.json<IApiResponse<ITag>>({
          status: 400,
          success: false,
          message: 'Tag with the same name already exists!',
          data: null,
        });
      }
    }

    let tag;
    const tagData = { name, description };
    if (existingTag) {
      tag = await Tag.findByIdAndUpdate(id, tagData, { new: true });
    } else {
      tag = new Tag(tagData);
      await tag.save();
    }

    return NextResponse.json<IApiResponse<ITag>>({
      success: true,
      status: existingTag ? 200 : 201,
      message: existingTag
        ? 'Tag updated successfully'
        : 'Tag added successfully',
      data: tag,
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
