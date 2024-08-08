import { User } from "@/Models/UserModel";

import Connect from "../Database/dbconn";

export async function GETID(email) {

await Connect();
const user = await User.findOne({email : email}) ; 

if (!user) {
return 1    
}

return user._id.toString()


    
}