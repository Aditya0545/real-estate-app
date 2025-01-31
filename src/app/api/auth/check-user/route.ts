import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Check database for existing user
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    return NextResponse.json({ exists: !!existingUser });
  } catch (error) {
    console.error('Check user error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 