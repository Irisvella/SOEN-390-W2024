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

        if (role !== "company") {
            return res.status(401).json({ message: "Unauthorized: Access is limited to company accounts only." });
        }

        // Build a file path that includes the company ID to ensure files are stored per company
        const filePath = `property-files/${property_id}/${originalname}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('property-files')
            .upload(filePath, buffer, {
                contentType: mimetype,
                upsert: true
            });

        if (uploadError) throw uploadError;

        // After uploading, immediately request a signed URL for the file
        const { data: signedUrlData, error: signedUrlError } = await supabase.storage
            .from('property-files')
            .createSignedUrl(filePath, 60 * 60); // Valid for 1 hour

        if (signedUrlError) throw signedUrlError;

        // Save file metadata to your database with the signed URL
        const fileEntry = await prisma.condo_management_files.create({
            data: {
                file_key: uploadData.path,
                file_type: 'other', // Define file type based on your logic or file metadata
                company_id: id,
                property_id: parseInt(property_id),
                description: 'Uploaded file',
                signed_url: signedUrlData.signedUrl // Store the signed URL if needed
            }
        });

        res.json({
            message: 'File uploaded successfully',
            data: fileEntry,
            signedUrl: signedUrlData.signedUrl
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).send('Failed to upload file');
    }
});


/*

router.post('/upload-file', verifyToken, upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file was uploaded.');
    }
    const { buffer, originalname, mimetype } = req.file;
    const { property_id } = req.body;

    try {
        const decoded = jwt.verify(req.token as string, process.env.SECRET as jwt.Secret);
        const { id, role } = (<any>decoded).data;

        
        if (role !== "company") {
            return res.status(401).json({ message: "Unauthorized: Access is limited to company accounts only." });
        }
        

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

*/

/*
router.get('/list-files', verifyToken, async (req, res) => {
    const { property_id } = req.query;

    try {
        const decoded = jwt.verify(req.token as string, process.env.SECRET as jwt.Secret);
        const { id, role } = (<any>decoded).data;

        if (role !== "company") {
            return res.status(401).json({ message: "Unauthorized: Access is limited to company accounts only." });
        }

        const { data, error } = await supabase.storage
            .from('property-files')
            .list(`property-files/${property_id}`, {
                limit: 100, // Limit the number of files returned
                offset: 0, // Start at the beginning of the list
                sortBy: { column: 'created_at', order: 'asc' },
            });

        if (error) throw error;

        res.json({ files: data });
    } catch (error) {
        console.error('Error listing files:', error);
        res.status(500).json({ message: 'Failed to list files' });
    }
});

*/

router.get('/list-files', verifyToken, async (req, res) => {
    const { property_id } = req.query;

    try {
        const decoded = jwt.verify(req.token as string, process.env.SECRET as jwt.Secret);
        const { id, role } = (<any>decoded).data;

        if (role !== "company") {
            return res.status(401).json({ message: "Unauthorized: Access is limited to company accounts only." });
        }

        const { data, error } = await supabase.storage
            .from('property-files')
            .list(`property-files/${property_id}`, {
                limit: 100, // Limit the number of files returned
                offset: 0, // Start at the beginning of the list
                sortBy: { column: 'created_at', order: 'asc' },
            });

        if (error) throw error;

        // Fetch signed URLs for each file
        const filesWithSignedUrls = await Promise.all(data.map(async file => {
            const { data: signedUrlData, error: signedUrlError } = await supabase.storage
                .from('property-files')
                .createSignedUrl(file.name, 60 * 60); // Valid for 1 hour

            if (signedUrlError) {
                throw signedUrlError;
            }

            return { ...file, signedUrl: signedUrlData.signedUrl };
        }));

        res.json({ files: filesWithSignedUrls });
    } catch (error) {
        console.error('Error listing files:', error);
        res.status(500).json({ message: 'Failed to list files' });
    }
});

export default router;
