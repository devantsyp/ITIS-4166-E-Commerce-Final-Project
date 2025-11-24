// FILL OUT THE SEED
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // --- USERS ---
  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("user123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "Regular User",
      email: "user@example.com",
      password: userPassword,
      role: "USER",
    },
  });

  console.log("Users created");

  // --- CATEGORIES ---
  const categories = await prisma.category.createMany({
    data: [
      { name: "Books" },
      { name: "Electronics" },
      { name: "Clothing" },
    ],
  });

  console.log("Categories created");

  // --- PRODUCTS ---
  const book = await prisma.product.create({
    data: {
      name: "The Great Gatsby",
      description: "Classic novel",
      price: 19.99,
      category: { connect: { name: "Books" } },
    },
  });

  const laptop = await prisma.product.create({
    data: {
      name: "Laptop",
      description: "Fast and reliable",
      price: 899.99,
      category: { connect: { name: "Electronics" } },
    },
  });

  const tshirt = await prisma.product.create({
    data: {
      name: "T-Shirt",
      description: "Comfortable cotton tee",
      price: 14.99,
      category: { connect: { name: "Clothing" } },
    },
  });

  console.log("🛒 Products created");

  // --- ORDER + ORDER ITEMS ---
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total: 934.97, // 19.99 + 899.99 + 14.99 (example total)
      status: "PAID",
      orderItems: {
        create: [
          {
            productId: book.id,
            quantity: 1,
            purchasePrice: 19.99,
          },
          {
            productId: laptop.id,
            quantity: 1,
            purchasePrice: 899.99,
          },
          {
            productId: tshirt.id,
            quantity: 1,
            purchasePrice: 14.99,
          },
        ],
      },
    },
  });

  console.log("Order + OrderItems created");

  console.log("Seeding complete!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
