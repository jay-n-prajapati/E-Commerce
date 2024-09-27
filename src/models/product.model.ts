import mongoose from 'mongoose';

export interface IProduct {
  id: string | mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  thumbnailUrl: string;
  category: string;
  tags: string[];
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
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
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

productSchema.virtual('id').get(function () {
  return this._id;
});

// Compile the schema into a model
const Product =
  (mongoose.models.Product as mongoose.Model<IProduct>) ||
  mongoose.model<IProduct>('Product', productSchema);

export default Product;
