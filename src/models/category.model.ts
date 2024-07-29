import mongoose from 'mongoose';

// types.ts or category.interface.ts

export interface ICategory {
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
      unique: true,
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
  }
);

// Compile the schema into a model
const Category =
  (mongoose.models.Category as mongoose.Model<ICategory>) ||
  mongoose.model<ICategory>('Category', categorySchema);

export default Category;
