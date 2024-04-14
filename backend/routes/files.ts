import { createClient } from '@supabase/supabase-js';
import express from "express";
import multer from "multer";
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verify-token";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.post('/upload-file', verifyToken, upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file was uploaded.');
    }
    const { buffer, originalname, mimetype } = req.file;
    const { property_id } = req.body;

    try {
        const decoded = jwt.verify(req.token as string, process.env.SECRET as jwt.Secret);
        const { id, role } = (<any>decoded).data;

        /*
        if (role !== "company") {
            return res.status(401).json({ message: "Unauthorized: Access is limited to company accounts only." });
        }
        */

        // Build a file path that includes the company ID to ensure files are stored per company
        const filePath = `property-files/${property_id}/${originalname}`;

        const { data, error } = await supabase.storage
            .from('property-files')
            .upload(filePath, buffer, {
                contentType: mimetype,
                upsert: true
            });

        if (error) throw error;

        // TODO: could get file type automatically
        const fileEntry = await prisma.condo_management_files.create({
            data: {
                file_key: data.path,  
                file_type: 'other', 
                company_id: id,     
                property_id: parseInt(property_id),
                description: 'Uploaded file'
            }
        });

        res.json({ message: 'File uploaded successfully', data: fileEntry });
        
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).send('Failed to upload file');
    }
});

export default router;
