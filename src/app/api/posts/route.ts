import { connectToDB } from "@/lib/db";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const GET = async(req: Request) => {
    try{
        await connectToDB();
        const url = new URL(req.url);
        const searchParams = new URLSearchParams(url.search);
        const userId = searchParams.get("userId");
        if (!userId) {
         return  new NextResponse(JSON.stringify('User ID not provided in query'), {status: 400})
        }

        const posts = await Post.find({creator: userId});
        if(!posts) return new NextResponse(JSON.stringify('Not found'), {status: 404})
        return new NextResponse(JSON.stringify(posts), {status: 200})
    }catch(error){
        return new NextResponse(JSON.stringify(`Failed to fetch all posts  ${error}`), {status: 500})
    }
}