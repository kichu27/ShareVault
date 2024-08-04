import { NextResponse } from "next/server";
import Connect from "@/app/Database/dbconn";
import { User } from "@/Models/UserModel";
import { sendemail } from "@/app/Helpers/mailer";

export const POST = async (request) => {
  try {
    // Ensure the database is connected
    await Connect();

    // Parse the request body
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "No user found with this email" }, { status: 404 });
    }

    // Send the email
    await sendemail(user.email, "RESET", user._id);

    return NextResponse.json({ message: "Email sent!" });

  } catch (error) {
    console.error("Error in POST /api/USERS/forgotpassword:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
