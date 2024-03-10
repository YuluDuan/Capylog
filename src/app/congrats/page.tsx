"use client";
import { readPostFromDatabase } from "@/lib/api-controlers";
import { Key, useEffect, useState } from "react";
import Image from "next/image";
import PostsBoard from "@/components/PostBoard";
import {Passage} from "@passageidentity/passage-js";
import Link from "next/link";

type Props = {};

const CongratsPage = (props: Props) => {
  const [post, setPost] = useState<any>();

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
      const passage = new Passage(process.env.PASSAGE_APP_ID || "");
      const user = passage.getCurrentUser();
      const userInfo = await user.userInfo();
      const userId = userInfo?.id || ""
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
        <img src="/assets/Capybara.gif" className="w-[300px] h-[300px]"/>
      <div className="flex gap-5 items-center">
        <Image
          src="/assets/yellow.svg"
          height={60}
          width={60}
          alt="yellow orange"
        />
        <p className="text-[#467439] font-medium w-[450px]">
          Hooray! Happy Day 1 of journaling! You earned a ‘Yuzu Hat’ for Capy. <Link href="/mindshift" className="underline">Keep journaling</Link> to earn more rewards!
        </p>
      </div>

      <div>{post?.length > 0 ? renderPosts() : <p>No posts available</p>}</div>
    </div>
  );
};

export default CongratsPage;
