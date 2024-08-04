import Connect from "@/app/Database/dbconn";
import { User } from "@/Models/UserModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    await Connect();

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({
        status: 400,
        message: "NO USER FOUND WITH THIS EMAIL !",
        success: false,
      });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({
        status: 400,
        message: "Invalid password",
        success: false,
      });
    } 

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      provider : user.provider,
      googleId : user.googleId || ""
    };

    const token = jwt.sign(tokenData, "sharevault27", { expiresIn: "1d" });
console.log(token)
    return NextResponse.json({
      status: 200,
      message: "Login Success !",
      success: true,
      token: token,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Login Failed",
      success: false,
    });
  }
}
