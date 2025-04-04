import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { Product } from "./Product.js";

@Entity()
export class Cart {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Product)
  product!: Product;

  @Property()
  quantity: number = 1; // Default to 1
}
