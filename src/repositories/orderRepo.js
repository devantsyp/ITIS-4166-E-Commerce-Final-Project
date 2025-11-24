import prisma from "../config/db.js";

/**
 * Get all orders (admin gets all, users get only their own)
 */
export const findOrders = (isAdmin, userId) => {
  return prisma.order.findMany({
    where: isAdmin ? {} : { userId },
    include: { orderItems: true },
  });
};

/**
 * Get a single order by ID
 */
export const findOrderById = (id) => {
  return prisma.order.findUnique({
    where: { id },
    include: { orderItems: true },
  });
};

/**
 * Get a product by its ID (used when creating/updating orders)
 */
export const findProductById = (id) => {
  return prisma.product.findUnique({
    where: { id },
  });
};

/**
 * Create an order
 */
export const createOrderRecord = (userId, total, orderItems) => {
  return prisma.order.create({
    data: {
      userId,
      total,
      orderitems: { create: orderItems },
    },
    include: { orderItems: true },
  });
};

/**
 * Delete all items from an order (used before updating)
 */
export const deleteOrderItems = (orderId) => {
  return prisma.orderItem.deleteMany({
    where: { orderId },
  });
};

/**
 * Update an existing order
 */
export const updateOrderRecord = (id, total, orderItems) => {
  return prisma.order.update({
    where: { id },
    data: {
      total,
      updatedAt: new Date(),
      orderItems: { create: orderItems },
    },
    include: { orderItems: true },
  });
};

/**
 * Delete an entire order
 */
export const deleteOrderRecord = (id) => {
  return prisma.order.delete({
    where: { id },
  });
};
