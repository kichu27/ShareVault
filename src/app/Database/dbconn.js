import mongoose from "mongoose";


export default async function Connect()
{

try {
await mongoose.connect(process.env.DB)
    console.log(" CONNECTION ESTABLSIHED !");
} catch (error) {
    console.log(" CONNECTION NOT ESTABLSIHED !");
}
}