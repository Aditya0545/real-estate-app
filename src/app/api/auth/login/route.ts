import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Determine if input is email or phone
    const isEmail = email.includes('@');

    // Find user
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: isEmail ? email : '' },
          { phone: !isEmail ? email : '' }
        ]
      }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Simulate user data (replace with actual database query)
    const userData = {
      name: email.split('@')[0], // Just for demonstration
      email: email,
      role: 'Real Estate Agent'
    };

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { password: _, ...userWithoutPassword } = user;

    const response = NextResponse.json(
      { message: 'Login successful', token, user: userWithoutPassword },
      { status: 200 }
    );

    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400 // 1 day
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Login failed' },
      { status: 500 }
    );
  }
} 