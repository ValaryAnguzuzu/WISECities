import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Product {
  @PrimaryKey() // Marks this as the table's primary key
  id!: number;

  @Property()
  name!: string;

  @Property()
  description!: string;

  @Property({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Property()
  imageUrl!: string;
}

