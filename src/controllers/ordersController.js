import prisma from "../prisma/index.js";

export const getOrders = async (req, res) => {
  const isAdmin = req.user.role === "ADMIN";

  const orders = await prisma.order.findMany({
    where: isAdmin ? {} : { userId: req.user.id },
    include: { items: true },
  });

  res.json(orders);
};

export const getOrder = async (req, res) => {
  const id = Number(req.params.id);

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) return res.status(404).json({ message: "Not found" });
  if (req.user.role !== "ADMIN" && order.userId !== req.user.id)
    return res.status(403).json({ message: "Forbidden" });

  res.json(order);
};

export const createOrder = async (req, res) => {
  const { userId, items } = req.body;

  const actualUserId = req.user.role === "ADMIN" ? userId : req.user.id;

  let total = 0;

  const orderItems = await Promise.all(
    items.map(async (i) => {
      const product = await prisma.product.findUnique({
        where: { id: i.itemId },
      });
      if (!product) throw Error("Invalid product ID");

      total += product.price * i.quantity;

      return {
        productId: i.itemId,
        quantity: i.quantity,
        purchasePrice: product.price,
      };
    })
  );

  const order = await prisma.order.create({
    data: {
      userId: actualUserId,
      total,
      items: { create: orderItems },
    },
    include: { items: true },
  });

  res.status(201).json(order);
};

export const updateOrder = async (req, res) => {
  const id = Number(req.params.id);
  const { items } = req.body;

  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) return res.status(404).json({ message: "Not found" });

  if (req.user.role !== "ADMIN" && order.userId !== req.user.id)
    return res.status(403).json({ message: "Forbidden" });

  // delete old items
  await prisma.orderItem.deleteMany({ where: { orderId: id } });

  let total = 0;

  const newItems = await Promise.all(
    items.map(async (i) => {
      const prod = await prisma.product.findUnique({
        where: { id: i.itemId },
      });
      if (!prod) throw Error("Invalid product");

      total += prod.price * i.quantity;

      return {
        productId: i.itemId,
        quantity: i.quantity,
        purchasePrice: prod.price,
      };
    })
  );

  const updated = await prisma.order.update({
    where: { id },
    data: {
      total,
      updatedAt: new Date(),
      items: { create: newItems },
    },
    include: { items: true },
  });

  res.json(updated);
};

export const deleteOrder = async (req, res) => {
  const id = Number(req.params.id);

  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) return res.status(404).json({ message: "Not found" });

  if (req.user.role !== "ADMIN" && order.userId !== req.user.id)
    return res.status(403).json({ message: "Forbidden" });

  await prisma.order.delete({ where: { id } });

  res.status(204).send();
};
