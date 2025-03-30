//fetch all products


// Import necessary modules
import { NextApiRequest, NextApiResponse } from "next";
import { orm } from "../../../src/database"; // Database connection
import { Product } from "../../../src/entities/Product"; // Product entity/model

// Define the API route handler
export default async function handler(
  req: NextApiRequest,  // Incoming request object
  res: NextApiResponse  // Outgoing response object
) {
  // Get the repository for Product entities
  // Repositories provide methods to interact with specific entity types
  const productRepository = orm.em.getRepository(Product);

  // Check the HTTP method
  if (req.method === "GET") {
    try {
      // Fetch all products from the database
      // findAll() retrieves all records of this entity type
      const products = await productRepository.findAll();
      
      // Return successful response with the products
      // Status 200 = OK
      // The products array will be automatically serialized to JSON
      res.status(200).json(products);
      
    } catch (error) {
      // Handle any errors that occur during database operations
      console.error("Error fetching products:", error);
      
      // Return error response
      // Status 500 = Internal Server Error
      res.status(500).json({ 
        message: "Failed to fetch products",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  } else {
    // Handle unsupported HTTP methods
    // Status 405 = Method Not Allowed
    // Include allowed methods in the response headers
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ 
      message: `Method ${req.method} not allowed`,
      allowedMethods: ['GET']
    });
  }
}