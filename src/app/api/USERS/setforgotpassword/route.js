import { NextResponse } from "next/server";
import Connect from "@/app/Database/dbconn";
import { User } from "@/Models/UserModel";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  try {
    // Ensure the database is connected
    await Connect();

    // Parse the request body
    const { token, newpassword } = await request.json();

    // Validate the input
    if (!token || !newpassword) {
      return NextResponse.json(
        { message: "Token and new password are required" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashednewpassword = await bcrypt.hash(newpassword, 10);

    // Find the user by the forgot password token and update the password
    const user = await User.findOneAndUpdate(
      { forgotPasswordToken: token },
      {
        password: hashednewpassword,
        forgotPasswordToken: undefined, // Clear the token
      },
      { new: true } // Return the updated document
    );

    if (!user) {
      return NextResponse.json(
        { message: "No user found with this token" },
        { status: 404 }
      );
    }

    // Save the updated user document
    await user.save();

    return NextResponse.json({ message: "Password Changed Successfully!" });
  } catch (error) {
    console.error("Error in POST /api/USERS/setforgotpassword:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
