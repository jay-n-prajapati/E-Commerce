'use server';

import Order from '@/models/order.model';
import Product from '@/models/product.model';
import User from '@/models/user.model';

export const getAnalytics = async () => {
  const numberOfProducts = await Product.countDocuments();
  const numberOfUsers = await User.countDocuments();
  const numberOfOrders = await Order.countDocuments();

  return {
    products: numberOfProducts ?? 0,
    users: numberOfUsers ?? 0,
    orders: numberOfOrders ?? 0,
  };
};
