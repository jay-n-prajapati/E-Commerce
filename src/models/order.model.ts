import mongoose from 'mongoose';

// types.ts or order.interface.ts

export interface IOrder {
  _id?: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId; // Reference to the User who placed the order
  products: {
    product: mongoose.Schema.Types.ObjectId; // Reference to the Product in the order
    quantity: number;
    price: number; // Price of the product at the time of order
  }[];
  totalAmount: number; // Total amount of the order
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  status: string; // Status of the order (e.g., 'pending', 'shipped', 'delivered')
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema for the Order model
const orderSchema: mongoose.Schema<IOrder> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered'],
      default: 'pending',
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
  }
);

// Compile the schema into a model
const Order =
  (mongoose.models.Order as mongoose.Model<IOrder>) ||
  mongoose.model<IOrder>('Order', orderSchema);

export default Order;
