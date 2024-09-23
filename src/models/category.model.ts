import mongoose from 'mongoose';

export interface ICategory {
  id: mongoose.Schema.Types.ObjectId | string;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema for the Category model
const categorySchema: mongoose.Schema<ICategory> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    toJSON: {
      virtuals: true, // Include virtuals when converting to JSON
      transform(doc, ret) {
        delete ret._id; // Remove the _id field from the response
      },
    },
    toObject: {
      virtuals: true, // Include virtuals when converting to a plain object
      transform(doc, ret) {
        delete ret._id; // Remove the _id field from the response
      },
    },
  }
);

categorySchema.virtual('id').get(function () {
  return this._id;
});

const Category =
  (mongoose.models.Category as mongoose.Model<ICategory>) ||
  mongoose.model<ICategory>('Category', categorySchema);

export default Category;
