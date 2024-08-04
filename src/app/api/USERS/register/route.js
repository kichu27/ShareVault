
import { User } from "@/Models/UserModel";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { sendemail } from "@/app/Helpers/mailer";
import Connect from "@/app/Database/dbconn";

export async function POST(req) {
  try {
   
await Connect()
    const { username, number, email, password, confirmpassword } = await req.json();

    const usernameExists = await User.findOne({ username: username });
    if (usernameExists) {
      return NextResponse.json({ status: 0, error: "Username already exists" });
    }

    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      return NextResponse.json({ status: 0, error: "Email already exists" });
    }

    if (password !== confirmpassword) {
      return NextResponse.json({ status: 0, error: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      number,
      email,
      password: hashedPassword, 
    }); 

    await newUser.save();


    if (newUser) {
        await sendemail(email, "VERIFY", newUser._id);
      } else {
        return NextResponse.json({ status: 0, msg: "User Not Saved Couldnot Send Email" });
      }
    return NextResponse.json({ status: 1, msg: "User registration successful" });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 0, message: "User registration unsuccessful", error: error.message });
  }
}
