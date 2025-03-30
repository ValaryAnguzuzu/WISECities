// Import database connection and entities
import { orm } from "../src/database.js"; // Your MikroORM configuration
import { Product } from "../src/entities/Product.js";
import { Cart } from "../src/entities/Cart.js";

async function seedDatabase() {
  const em = orm.em.fork(); // Create a fresh EntityManager

  // 1. Clear existing data (carts first due to foreign key constraint)
  await em.nativeDelete(Cart, {});
  await em.nativeDelete(Product, {});

  // 2. Define product list
  const products = [
    {
      name: "Apple Airpods",
      description: "2nd Generation Airpods with charging case",
      price: 199.99,
      imageUrl: "/images/headphones.jpg",
    },
    {
      name: "Smart Watch",
      description: "Fitness tracker with heart rate monitor",
      price: 249.99,
      imageUrl: "/images/smartwatch.jpg",
    },
    {
      name: "Bluetooth Speaker",
      description: "Portable speaker with 20hr battery life",
      price: 89.99,
      imageUrl: "/images/speaker.jpg",
    },
    {
      name: "Laptop Backpack",
      description: "Water-resistant bag with USB charging port",
      price: 59.99,
      imageUrl: "/images/backpack.jpg",
    },
    {
      name: "Noise Cancelling Headphones",
      description: "Over-ear headphones with ANC and deep bass",
      price: 129.99,
      imageUrl: "/images/noise-cancelling.jpg",
    },
  ];

  // 3. Create and persist products
  for (const data of products) {
    const product = em.create(Product, data); // Instantiate product
    em.persist(product); // Queue for insertion
  }

  await em.flush(); // Commit all at once

  // 4. Optional: confirm and close
  const productCount = await em.count(Product);
  console.log(`Database now contains ${productCount} products`);

  await orm.close();
  console.log("Seeding completed and connection closed.");
}

// Run the script
seedDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
