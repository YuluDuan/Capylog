"use client";
import { readPostFromDatabase } from "@/lib/api-controlers";
import { Key, useEffect, useState } from "react";
import Image from "next/image";
import PostsBoard from "@/components/PostBoard";

type Props = {};

const CongratsPage = (props: Props) => {
  const [post, setPost] = useState<any>();

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const userId = "1";
    try {
      const data = await readPostFromDatabase(userId);
      console.log(data);
      setPost(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const renderPosts = () => {
    return (
      <div className="w-full py-[45px] px-[20px] bg-[#FFFAF6] rounded-3xl">
        <p className="text-center pb-8 font-bold text-2xl text-[#614F3F]">
          Today’s Entry
        </p>
        {post.map((p: any) => (
          <div key={p.id} className="pb-5">
            <PostsBoard createdAt={p.createdAt} revised_text={p.revised_text} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center py-10">
      <h1 className="text-2xl text-[#614F3F] font-bold">CapyLog</h1>
      <video controls className="w-[300px] h-[300px]">
        <source src="/assets/Capybara.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex gap-5 items-center">
        <Image
          src="/assets/yellow.svg"
          height={60}
          width={60}
          alt="yellow orange"
        />
        <p className="text-[#467439] font-medium w-[450px]">
          Hooray! Happy Day 1 of journaling! You earned a ‘Yuzu Hat’ for Capy.
          Keep journaling to earn more rewards!
        </p>
      </div>

      <div>{post?.length > 0 ? renderPosts() : <p>No posts available</p>}</div>
    </div>
  );
};

export default CongratsPage;
