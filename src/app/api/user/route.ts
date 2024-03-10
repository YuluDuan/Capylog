import { connectToDB } from "@/lib/db";
import User from "@/models/user";
import { NextResponse} from 'next/server'

export const POST = async (req : Request) => {
    const {user_id, email, firstName, lastName} = await req.json();
    try {
        await connectToDB();
        const newUser = new User({user_id, email, firstName, lastName});
        await newUser.save();
        return new NextResponse(JSON.stringify(newUser), { status: 201 })
    } catch (error) {
        console.log(error);
        return new NextResponse("Failed to create a new prompt", { status: 500 });
    }
}