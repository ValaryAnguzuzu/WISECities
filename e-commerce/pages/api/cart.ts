import { NextApiRequest, NextApiResponse } from "next";
import { orm } from "../../src/database";
import { Cart } from "../../src/entities/Cart";
import { Product } from "../../src/entities/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      // Handle GET Request (Fetch All Cart Items)
      const cartItems = await orm.em.find(Cart, {}, { populate: ["product"] }); // Populating product details
      return res.status(200).json(cartItems);
    } else if (req.method === "POST") {
      // Handle POST Request (Add/Update Cart Items)
      const { productId, quantity } = req.body;

      // 1. INPUT VALIDATION
      if (!productId || !quantity) {
        return res
          .status(400)
          .json({ message: "Product ID and quantity are required" });
      }

      // 2. CONVERT TO NUMBERS
      const numericProductId = Number(productId);
      const numericQuantity = Number(quantity);

      if (isNaN(numericProductId) || isNaN(numericQuantity)) {
        return res
          .status(400)
          .json({ message: "Invalid product ID or quantity format" });
      }

      // 3. FIND PRODUCT
      const product = await orm.em.findOne(Product, { id: numericProductId });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // 4. CHECK FOR EXISTING CART ITEM
      const existingItem = await orm.em.findOne(Cart, { product });

      if (existingItem) {
        // UPDATE EXISTING ITEM
        existingItem.quantity += numericQuantity;
      } else {
        // CREATE NEW CART ITEM
        const cartItem = new Cart();
        cartItem.product = product;
        cartItem.quantity = numericQuantity;
        orm.em.persist(cartItem);
      }

      // 5. SAVE CHANGES
      await orm.em.flush();

      return res.status(201).json({
        success: true,
        message: "Product added to cart",
        productId: numericProductId,
        quantity: existingItem ? existingItem.quantity : numericQuantity,
      });
    } else if (req.method === "PUT") {
      // Handle PUT Request (Replace Cart Item Quantity)
      const { productId, quantity } = req.body;

      if (!productId || !quantity) {
        return res
          .status(400)
          .json({ message: "Product ID and quantity are required" });
      }

      const numericProductId = Number(productId);
      const numericQuantity = Number(quantity);

      if (isNaN(numericProductId) || isNaN(numericQuantity)) {
        return res
          .status(400)
          .json({ message: "Invalid product ID or quantity format" });
      }

      const product = await orm.em.findOne(Product, { id: numericProductId });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const existingItem = await orm.em.findOne(Cart, { product });

      if (!existingItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      existingItem.quantity = numericQuantity; //Replace with new quantity

      await orm.em.flush();

      return res.status(200).json({
        success: true,
        message: "Cart item replaced successfully", 
        productId,
        quantity: numericQuantity,
      });
    } else if (req.method === "PATCH") {
      // Handle PATCH Request (Increment/Decrement Cart Item)
      const { productId, quantity } = req.body;

      if (!productId || quantity == null) {
        return res
          .status(400)
          .json({ message: "Product ID and quantity are required" });
      }

      const numericProductId = Number(productId);
      const numericQuantity = Number(quantity);

      if (isNaN(numericProductId) || isNaN(numericQuantity)) {
        return res
          .status(400)
          .json({ message: "Invalid product ID or quantity format" });
      }

      const product = await orm.em.findOne(Product, { id: numericProductId });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const existingItem = await orm.em.findOne(Cart, { product });

      if (!existingItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      existingItem.quantity += numericQuantity; // Add or subtract quantity

      if (existingItem.quantity < 1) {
        await orm.em.remove(existingItem).flush(); // Auto-delete if 0 or less
        return res.status(200).json({
          success: true,
          message: "Cart item removed due to zero quantity",
        });
      }

      await orm.em.flush();

      return res.status(200).json({
        success: true,
        message: "Cart item updated",
        productId,
        quantity: existingItem.quantity,
      });
    } else if (req.method === "DELETE") {
      // Handle DELETE Request (Clear Cart)
      await orm.em.nativeDelete(Cart, {}); // Deletes all cart items
      return res.status(200).json({
        success: true,
        message: "Cart cleared successfully",
      });
    } else {
      // 6. Handle Unsupported Methods
      res.setHeader("Allow", ["GET", "POST", "PUT", "PATCH", "DELETE"]); 
      return res.status(405).json({
        success: false,
        message: `Method ${req.method} not allowed`,
      });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
