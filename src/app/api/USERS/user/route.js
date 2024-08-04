import { NextResponse } from "next/server";
import Connect from "@/app/Database/dbconn";
import { User } from "@/Models/UserModel";



export const POST = async (request) => {
    try {
      // Ensure the database is connected
      await Connect();
  
   
      const {id } = await request.json();
  
      // Validate the input
      if (!id) {
        return NextResponse.json(
          { message: "id is required" },
          { status: 400 }
        );
      }
  
      const user = await User.findOne(
        { _id : id }
      );
  
      if (!user) {
        return NextResponse.json(
          { message: "No user found with this id" },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ "data" : user });
    } catch (error) {
      
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 },
        {error : error}
      );
    }
  };
  