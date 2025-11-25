import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // -------------------------
  // Users (UPSERT - safe)
  // -------------------------
  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("user123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      name: "Regular User",
      email: "user@example.com",
      password: userPassword,
      role: "USER",
    },
  });

  console.log("Users created");

  // -------------------------
  // Categories (UPSERT)
  // -------------------------
  const books = await prisma.category.upsert({
    where: { name: "Books" },
    update: {},
    create: { name: "Books" },
  });

  const electronics = await prisma.category.upsert({
    where: { name: "Electronics" },
    update: {},
    create: { name: "Electronics" },
  });

  const clothing = await prisma.category.upsert({
    where: { name: "Clothing" },
    update: {},
    create: { name: "Clothing" },
  });

  console.log("Categories created");

  // -------------------------
  // Products (UPSERT)
  // -------------------------
  const book = await prisma.product.upsert({
    where: { name: "The Great Gatsby" },
    update: {},
    create: {
      name: "The Great Gatsby",
      description: "Classic novel",
      price: 19.99,
      categoryId: books.id,
    },
  });

  const laptop = await prisma.product.upsert({
    where: { name: "Laptop" },
    update: {},
    create: {
      name: "Laptop",
      description: "Fast and reliable",
      price: 899.99,
      categoryId: electronics.id,
    },
  });

  const tshirt = await prisma.product.upsert({
    where: { name: "T-Shirt" },
    update: {},
    create: {
      name: "T-Shirt",
      description: "Comfortable cotton tee",
      price: 14.99,
      categoryId: clothing.id,
    },
  });

  console.log("Products created");

  // -------------------------
  // Order + Order Items (SAFE)
  // We check if an order already exists to avoid duplicates
  // -------------------------
  const existingOrder = await prisma.order.findFirst({
    where: { userId: user.id }
  });

  if (!existingOrder) {
    await prisma.order.create({
      data: {
        userId: user.id,
        total: 19.99 + 899.99 + 14.99,
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
  } else {
    console.log("Order already exists, skipping");
  }

  console.log("Seeding complete!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });