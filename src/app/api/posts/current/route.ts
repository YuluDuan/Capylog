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

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for the start of the day
        const todayEnd = new Date(todayStart);
        todayEnd.setDate(todayEnd.getDate() + 1); // Set end of the day to one day ahead
    
        const post = await Post.find({
          creator: userId,
          createdAt: {
            $gte: todayStart,
            $lt: todayEnd,
          },
        }).sort({ createdAt: -1 }) // Sort by createdAt in descending order
        .exec();
        
        if(!post) return new NextResponse(JSON.stringify('Not found'), {status: 404})
        return new NextResponse(JSON.stringify(post), {status: 200})
    }catch(error){
        return new NextResponse(JSON.stringify(`Failed to fetch the post  ${error}`), {status: 500})
    }
}