import { NextResponse } from "next/server";
import { User } from "@/Models/UserModel";

export async function POST(request) {
  try {
    const { object } = await request.json();
    console.log(object)
    const { imgurl, name, size,  id ,type} = object;
  
    
    if (!imgurl || !name || !size  || !id) {
      return NextResponse.json({ "Message": "Missing required fields" });
    }

    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ "Message": "User not found" });
    }

    // Check if the document is already in favorites
    const documentExists = user.favdocuments.some(doc => doc.imgurl === imgurl);
    if (documentExists) {
      return NextResponse.json({ "Message": "Document already in favorites" });
    }

    // Add the new document to favorites
    user.favdocuments.push({ imgurl, name, size ,type });
    await user.save();

    return NextResponse.json({ "Message": "Document Added To Favourites" });

  } catch (error) {
    console.error("Error in POST /api/USERS/favouritedoc:", error);
    return NextResponse.json({ "Message": error.message });
  }
}
