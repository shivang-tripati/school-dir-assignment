/* eslint-disable @typescript-eslint/no-explicit-any */
import { query } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const results = await query({
      query: 'SELECT * FROM schools ORDER BY created_at DESC',
      values: [],
    });
    
    return NextResponse.json(results);
  } catch (error: any) {
    console.error('Database error in GET /api/schools:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch schools' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, address, city, state, contact, image, email_id } = body;
    
    // Input validation
    if (!name || !address || !city || !state || !contact || !email_id) {
      return NextResponse.json(
        { message: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    const result = await query({
      query: `
        INSERT INTO schools (name, address, city, state, contact, image, email_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      values: [name, address, city, state, contact, image, email_id],
    });
    
    return NextResponse.json({ 
      id: (result as any).insertId,
      message: 'School added successfully'
    }, { status: 201 });
  } catch (error: any) {
    console.error('Database error in POST /api/schools:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to add school' },
      { status: 500 }
    );
  }
}