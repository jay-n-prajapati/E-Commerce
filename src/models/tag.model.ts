import mongoose from 'mongoose';

export interface ITag {
  id: string | mongoose.Schema.Types.ObjectId;
  name: string;
  description?: string;
  createdAt?: Date;
}

const tagSchema = new mongoose.Schema<ITag>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    toJSON: {
      virtuals: true, // Include virtuals when converting to JSON
      transform(doc, ret) {
        delete ret._id; // Remove _id field from the response
      },
    },
    toObject: {
      virtuals: true, // Include virtuals when converting to a plain object
      transform(doc, ret) {
        delete ret._id; // Remove _id field from the response
      },
    },
  }
);

// Create a virtual property for "id" that returns the "_id" field as a string
tagSchema.virtual('id').get(function () {
  return this._id;
});

const Tag =
  (mongoose.models.Tags as mongoose.Model<ITag>) ||
  mongoose.model<ITag>('Tags', tagSchema);

export default Tag;
