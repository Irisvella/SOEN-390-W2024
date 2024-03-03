import express, { Request, Response } from "express";
import prisma from "../prisma/client";
const router = express.Router();

// Route to handle the submission of a new listing
router.post('/', async (req: Request, res: Response) => {
    const { id,size, condo_fee, address, unit_id,image_url } = req.body;
    
    try {
      const newListing = await prisma.property.create({
        data: {
            
          id,
          size,
          condo_fee,
          address,
          unit_id,
          image_url,
          
         
        },
      });
      res.status(201).json(newListing); // Respond with the created listing
    } catch (error) {
      console.error("Failed to create listing:", error);
      res.status(500).json({ message: "Failed to create listing" });
    }
  });
  
  
  



// Route to get all listings
router.get('/', async (req: Request, res: Response) => {
    try {
      // Retrieve all listings from the database
      const listings = await prisma.property.findMany();
      res.status(200).json(listings);
    } catch (error) {
      console.error("Failed to retrieve listings:", error);
      res.status(500).json({ message: "Failed to retrieve listings" });
    }
  });
  
  export default router;
