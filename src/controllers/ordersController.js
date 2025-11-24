import {
  findOrders,
  findOrderById,
  findProductById,
  createOrderRecord,
  deleteOrderItems,
  updateOrderRecord,
  deleteOrderRecord,
} from "../repositories/orderRepo.js";


export const getOrders = async (req, res) => {
  console.log("REQ.USER:", req.user);
  const isAdmin = req.user.role === "ADMIN";
  const orders = await findOrders(isAdmin, req.user.id);
  res.json(orders);
};

export const getOrder = async (req, res) => {
  const id = Number(req.params.id);
  const order = await findOrderById(id);

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
      const product = await findProductById(i.itemId);
      if (!product) throw Error("Invalid product ID");

      total += product.price * i.quantity;

      return {
        productId: i.itemId,
        quantity: i.quantity,
        purchasePrice: product.price,
      };
    })
  );

  const order = await createOrderRecord(actualUserId, total, orderItems);

  res.status(201).json(order);
};

export const updateOrder = async (req, res) => {
  const id = Number(req.params.id);
  const { items } = req.body;

  const order = await findOrderById(id);
  if (!order) return res.status(404).json({ message: "Not found" });

  if (req.user.role !== "ADMIN" && order.userId !== req.user.id)
    return res.status(403).json({ message: "Forbidden" });

  await deleteOrderItems(id);

  let total = 0;

  const newItems = await Promise.all(
    items.map(async (i) => {
      const prod = await findProductById(i.itemId);
      if (!prod) throw Error("Invalid product");

      total += prod.price * i.quantity;

      return {
        productId: i.itemId,
        quantity: i.quantity,
        purchasePrice: prod.price,
      };
    })
  );

  const updated = await updateOrderRecord(id, total, newItems);

  res.json(updated);
};

export const deleteOrder = async (req, res) => {
  const id = Number(req.params.id);

  const order = await findOrderById(id);
  if (!order) return res.status(404).json({ message: "Not found" });

  if (req.user.role !== "ADMIN" && order.userId !== req.user.id)
    return res.status(403).json({ message: "Forbidden" });

  await deleteOrderRecord(id);

  res.status(204).send();
};
