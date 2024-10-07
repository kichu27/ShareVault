import { NextResponse } from 'next/server';
import { User } from '@/Models/UserModel';

export async function POST(request) {
  try {
    const { email } = await request.json();
    
    // Check for missing ID
    if (!email) {
      return NextResponse.json(
        { message: 'Missing user ID' },
        { status: 400 }
      );
    }

    // Find the user by ID
    const user = await User.find({email :email});
  

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Respond with the user's ID
    return NextResponse.json(
      { id: user[0]._id.toString() }, // Ensure ID is sent as a string
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in POST /api/users/getid:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
