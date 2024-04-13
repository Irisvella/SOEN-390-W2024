/*import { createClient } from '@supabase/supabase-js';
import express from "express";
import multer from "multer";
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();

const supabaseUrl = 'postgres://postgres.wvoqgfpyksgruootcynr:[YOUR-PASSWORD]@aws-0-ca-central-1.pooler.supabase.com:5432/postgres';
const supabaseKey = 'bb';
const supabase = createClient(supabaseUrl, supabaseKey);
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/upload-file', verifyToken, upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file was uploaded.');
    }

    const file = req.file; 
    const { propertyId } = req.body;
    const filePath = `properties/${propertyId}/${file.originalname}`;

    try {
        const decoded = jwt.verify(req.token as string, process.env.SECRET as jwt.Secret);
        const { id, role } = (<any>decoded).data;

        if (role !== "company") {
            return res.status(401).json({ message: "Unauthorized: Access is limited to company accounts only." });
        }

        const { data, error } = await supabase.storage
            .from('property-files')
            .upload(filePath, file.buffer, {
                contentType: file.mimetype,
                upsert: true
            });

        if (error) throw error;

        const fileEntry = await prisma.condo_management_files.create({
            data: {
                file_key: data.path,
                file_type: 'other',
                company_id: id,
                property_id: parseInt(propertyId),
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
*/