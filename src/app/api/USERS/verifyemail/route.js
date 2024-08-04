import Connect from "@/app/Database/dbconn";
import {  NextResponse } from "next/server";
import { User } from "@/Models/UserModel";


export async function POST(request)
{

try {
    await Connect()
    const reqbody = await request.json()
    const {token} = reqbody ; 
    console.log(token);
   const user =  await User.findOne({verifyToken:token})
console.log("user",user)
if(!user)
{
    return NextResponse.json({message : "No User found !"})
}


user.isVerified = true ; 
user.verifyToken = undefined ; 
user.verifyTokenExpiry = undefined ; 
await user.save() ; 

return NextResponse.json({message :"Email verified successsfully !", success :true})

} catch (error) {
    console.log(error);
    return NextResponse.json(error)
}
} 