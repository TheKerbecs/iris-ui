import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdir } from 'fs/promises';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('pdf') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No PDF file provided' },
        { status: 400 }
      );
    }

    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create the upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'pdfs');
    await mkdir(uploadDir, { recursive: true });

    // Save the file
    const filePath = path.join(uploadDir, file.name);
    // Fix: Use Uint8Array instead of Buffer for writeFile
    await writeFile(filePath, new Uint8Array(buffer));

    // Return the path where the file was saved
    const publicPath = `/uploads/pdfs/${file.name}`;
    
    return NextResponse.json({ 
      success: true,
      message: 'PDF processed successfully', 
      path: publicPath 
    });
  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error processing PDF' },
      { status: 500 }
    );
  }
}