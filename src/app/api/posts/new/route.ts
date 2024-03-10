import Post from "@/models/post";
import { connectToDB } from "../../../../lib/db";
import { NextResponse} from 'next/server'

export const POST = async (req : Request) => {
    const {id, original_text, revised_text, userId} = await req.json();
    try {
        await connectToDB();
        const newPost = new Post({id, original_text, revised_text, creator: userId});
        await newPost.save();
        return new NextResponse(JSON.stringify(newPost), { status: 201 })
    } catch (error) {
        console.log(error);
        return new NextResponse("Failed to create a new Post", { status: 500 });
    }
}