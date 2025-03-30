//Fetch Single Product by ID

// Import required modules and types
import { NextApiRequest, NextApiResponse } from "next";
import { orm } from "../../../src/database"; // Database connection setup
import { Product } from "../../../src/entities/Product"; // Product entity definition

// API route handler for fetching a single product
export default async function handler(
  req: NextApiRequest, // Incoming request object
  res: NextApiResponse // Outgoing response object
) {
  // Get the repository for Product entities
  // The repository provides methods to interact with Product records
  const productRepository = orm.em.getRepository(Product);

  // Handle GET requests (fetching a product)
  if (req.method === "GET") {
    try {
      // 1. Validate and parse the product ID from query parameters
      const productId = Number(req.query.id);

      // Check if the ID is valid (a positive number)
      if (isNaN(productId) || productId <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID format",
          details: "ID must be a positive number",
        });
      }

      // 2. Attempt to find the product in the database
      const product = await productRepository.findOne({
        id: productId,
      });

      // 3. Handle product not found case
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
          requestedId: productId,
        });
      }

      // 4. Return the found product
      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      // 5. Handle any unexpected errors
      console.error(`Error fetching product ${req.query.id}:`, error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : "Unknown error"
            : undefined,
      });
    }
  }
  // Handle unsupported HTTP methods
  else {
    res.setHeader("Allow", ["GET"]); // Inform client which methods are allowed
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`,
      allowedMethods: ["GET"],
    });
  }
}
