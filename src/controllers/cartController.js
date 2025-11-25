import * as cartRepo from "../repositories/cartRepo.js";
import prisma from "../config/db.js";

export const getCart = async (req, res) => {
  const userId = req.user.id;
  let cart = await cartRepo.findCartByUser(userId);

  if (!cart) {
    cart = await cartRepo.createCart(userId);
  }

  res.json(cart);
};

export const addItemToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  if (!productId || !quantity) return res.status(400).json({ message: "Missing productId or quantity" });

  let cart = await cartRepo.findCartByUser(userId);
  if (!cart) cart = await cartRepo.createCart(userId);

  // Check if item already exists in cart
  const existingItem = cart.orderItems.find(item => item.productId === productId);

  if (existingItem) {
    const updatedItem = await cartRepo.updateItem(existingItem.id, existingItem.quantity + quantity);
    return res.json(updatedItem);
  }

  // Get product price
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return res.status(404).json({ message: "Product not found" });

  const newItem = await cartRepo.addItem(cart.id, productId, quantity, product.price);
  res.status(201).json(newItem);
};

export const updateCartItem = async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) return res.status(400).json({ message: "Invalid quantity" });

  const updatedItem = await cartRepo.updateItem(Number(itemId), quantity);
  res.json(updatedItem);
};

export const removeCartItem = async (req, res) => {
  const { itemId } = req.params;
  await cartRepo.removeItem(Number(itemId));
  res.status(204).send();
};

export const checkoutCart = async (req, res) => {
  const userId = req.user.id;
  const cart = await cartRepo.findCartByUser(userId);
  if (!cart) return res.status(400).json({ message: "No cart found" });

  // Calculate total
  const total = cart.orderItems.reduce((sum, item) => sum + item.quantity * item.purchasePrice, 0);
  const order = await cartRepo.checkoutCart(cart.id, total);

  res.json(order);
};
