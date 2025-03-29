import { MikroORM } from "@mikro-orm/core";
import { SqliteDriver } from "@mikro-orm/sqlite";
import { Product } from "./entities/Product";
import { Cart } from "./entities/Cart";

// Simple database configuration
export const orm = await MikroORM.init({
  entities: [Product, Cart],
  dbName: "ecommerce_db.sqlite", // Stores data in this file
  driver: SqliteDriver,
  debug: true,
  allowGlobalContext: true,
});

// Automatically create tables if they don't exist
const generator = orm.getSchemaGenerator();
await generator.createSchema();
