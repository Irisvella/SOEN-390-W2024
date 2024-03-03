import express, { Request, Response } from 'express';
import prisma from '../prisma/client';
import jwt from 'jsonwebtoken';
import verifyToken from '../middleware/verify-token';
require('dotenv').config();

const router = express.Router();

// Types for company and user data
interface companyData {
  id: number;
  address: string;
  PostalCode: string;
  image_url: string;
  company_name: string;
}

interface userData {
  id: number;
  address: string;
  PostalCode:String;
  image_url: string;
  username: string;
}

// Get all listings
router.get('/dashboard/listings', async (req: Request, res: Response) => {
  console.log('Received request for creating/updating listing:', req.body);
  try {
    const listings = await prisma.property.findMany({
      select: {
        id: true,
        address: true,
        image_url: true,
        // Add other fields you need to fetch
      },
    });

    res.status(200).json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ message: 'Unexpected error occurred while fetching listings' });
  }
});

// Simplified and corrected function to create or update a listing
async function createOrUpdateListing(listingData: any): Promise<any> {
  
  const { id, ...data } = listingData;
  if (id) {
    // Update existing listing
    return await prisma.property.update({
      where: { id },
      data,
    });
  } else {
    // Create new listing
    return await prisma.property.create({
      data,
    });
  }
}

router.post('/dashboard/listings', async (req: Request, res: Response) => {
  
  try {
    const { address, postalCode, totalUnit, parkingSpaces, amenities, description, unit_id } = req.body;
    
    const data = { address, postalCode, totalUnit, parkingSpaces, amenities, description, unit_id };
    console.log('Data to be saved:', data);
    const result = await createOrUpdateListing(data);
    res.json(result);
  } catch (error) {
    console.error('Error saving listing:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Unexpected error occurred while saving the listing' });
      console.log('Request body at error:', req.body);
    }
  }

});


  

// Existing GET route with JWT verification
router.get('/', verifyToken, async (req: Request, res: Response) => {
  // ... existing implementation ...
});

export default router;
