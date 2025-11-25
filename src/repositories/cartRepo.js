import prisma from "../config/db.js";

export const findCartByUser = async (userId) => {
  return prisma.order.findFirst({
    where: { userId, status: "CART" },
    include: { orderItems: { include: { product: true } } },
  });
};

export const createCart = async (userId) => {
  return prisma.order.create({ data: { userId, status: "CART" } });
};

export const addItem = async (orderId, productId, quantity, purchasePrice) => {
  return prisma.orderItem.create({
    data: { orderId, productId, quantity, purchasePrice },
  });
};

export const updateItem = async (itemId, quantity) => {
  return prisma.orderItem.update({ where: { id: itemId }, data: { quantity } });
};

export const removeItem = async (itemId) => {
  return prisma.orderItem.delete({ where: { id: itemId } });
};

export const checkoutCart = async (orderId, total) => {
  return prisma.order.update({
    where: { id: orderId },
    data: { status: "PENDING", total },
  });
};
