import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Count users (should return 0 initially)
    const userCount = await prisma.user.count();
    
    return NextResponse.json({ 
      message: 'Database connection successful',
      userCount 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { message: 'Database connection failed' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 