/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = file.name.replace(/\.[^/.]+$/, '') + '-' + uniqueSuffix + path.extname(file.name);
    
    try {
      // Ensure the directory exists
      const publicDir = path.join(process.cwd(), 'public', 'schoolImages');
      await mkdir(publicDir, { recursive: true });
      
      // Save file to public/schoolImages directory
      const filepath = path.join(publicDir, filename);
      await writeFile(filepath, buffer);
      
      return NextResponse.json({ 
        message: 'File uploaded successfully', 
        filename 
      });
    } catch (fsError: any) {
      console.error('File system error:', fsError);
      return NextResponse.json(
        { error: 'Failed to save file: ' + fsError.message },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}