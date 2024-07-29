import mongoose from 'mongoose';

// types.ts or product.interface.ts
export interface IProduct {
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  thumbnailUrl: string;
  category: string;
  stockQuantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema for the Product model
const productSchema: mongoose.Schema<IProduct> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrls: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length > 0 && v.length <= 5, // Validate imageUrls length
        message: 'There should be between 1 and 5 images.',
      },
    },
    thumbnailUrl: {
      type: String,
      required: true,
      // validate: {
      //   validator: (v: string) => this.imageUrls.includes(v), // Validate thumbnailUrl exists in imageUrls
      //   message: 'Thumbnail URL must be one of the provided image URLs.',
      // },
    },
    category: {
      type: String,
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
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
const Product =
  (mongoose.models.Product as mongoose.Model<IProduct>) ||
  mongoose.model<IProduct>('Product', productSchema);

export default Product;
