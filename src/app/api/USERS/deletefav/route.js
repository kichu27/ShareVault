import { NextResponse } from "next/server"; 
import { User } from "@/Models/UserModel";
import Connect from "@/app/Database/dbconn";    

export async function POST(request) 
{
    try {
        const response = await request.json(); 
        const { data } = response; 
        const { id, imgUrl } = data; 

        console.log(id, imgUrl);
        await Connect();

        const res = await User.updateOne(
            { _id: id }, 
            { $pull: { favdocuments: { imgurl: imgUrl } } }
        );

        if (res.modifiedCount > 0) {
            return NextResponse.json({ Message: "success!" });
        } else {
            return NextResponse.json({ Message: "Failed to update the document!" });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ Message: "Failed!" });
    }
}
