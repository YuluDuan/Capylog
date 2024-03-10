"use client";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import Image from "next/image";
import {generateResponse} from "./generate";
import {readPostsFromDatabase, savePostToDatabase,} from "@/lib/api-controlers";
import {v4 as uuidv4} from "uuid";
import {toast} from "react-hot-toast";
import PostsBoard from "@/components/PostBoard";
import Conversation from "@/components/Conversation";
import { useRouter } from "next/navigation";
import { Passage } from "@passageidentity/passage-js";

interface PostType {
  id: string;
  original_text: string;
  revised_text: string;
  userId: string;
  created: Date;
}

export default function Mindshift() {
  const router = useRouter();
  const [generation, setGeneration] = useState("");
  const [userInput, setInput] = useState("");
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // get the userid from auth
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const passage = new Passage(process.env.PASSAGE_APP_ID || "");
        const user = passage.getCurrentUser();
        const userInfo = await user.userInfo();
        const userId = userInfo?.id || "";
        const posts = await readPostsFromDatabase(userId);
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [generation]);

  // const getGeneration = (text: string) => {
  //   generateResponse(text).then((res) => setGeneration(res));
  // };

  const handleUserChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsGenerating(true);
    //fetch from the auth
    const passage = new Passage(process.env.PASSAGE_APP_ID || "");
    const user = passage.getCurrentUser();
    const userInfo = await user.userInfo();
    const userId = userInfo?.id || "";

    const id = uuidv4();
    try {
      const res = await generateResponse(userInput);
      setGeneration(res);
      await savePostToDatabase({
        id,
        original_text: userInput,
        revised_text: res,
        userId,
      });

      const newPost: PostType = {
        id,
        original_text: userInput,
        revised_text: res,
        userId,
        created: new Date(),
      };
      setPosts((prevPosts) => [...(prevPosts || []), newPost]);
      setIsGenerating(false);
      toast.success(`post created`, { duration: 2000 });
      router.push("/congrats");
    } catch (error) {
      toast.error(`"Error while creating post`);
    }
  };

  const renderPosts = () => {
    return posts.map((post) => (
      <div key={post.id} className="pb-5">
        <PostsBoard createdAt={post.created} revised_text={post.revised_text} />
      </div>
    ));
  };

  const today = new Date();

  const formatDate = (date: any) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const shouldHaveReword = () => {
    const post =  posts.find((post: any) => {
      const postDate = new Date(post.createdAt)
      const todayDate = new Date()
      return postDate.getFullYear() === todayDate.getFullYear() &&
          postDate.getMonth() === todayDate.getMonth() &&
          postDate.getDate() === todayDate.getDate();
    })

    return !!post
  }

  return (
    <div className="flex flex-col gap-5 justify-center items-center py-10">
      <h1 className="text-2xl text-[#614F3F] font-bold">CapyLog</h1>
      <Conversation haveReward={shouldHaveReword()}/>

      <div className="flex flex-col gap-2 items-start">
        <p className="text-[#B18E71] font-semibold">{formatDate(today)}</p>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-5 items-end pb-8"
        >
          <textarea
            className="bg-[#FFFFFF] h-[186px] w-[800px] rounded-md focus:outline-none py-2 px-5 resize-none overflow-y-auto"
            value={userInput}
            onChange={handleUserChange}
            placeholder="Start journaling here!"
          />
          <button
            type="submit"
            className="h-[56px] w-[162px] bg-[#C2A58E] text-[#614F3F] rounded-2xl text-lg font-semibold "
            disabled={isGenerating}
          >
            {isGenerating ? "Revising..." : "Submit"}
          </button>
        </form>

        <Image
          className="pb-5 mx-auto"
          src="/assets/Yuzu3.svg"
          height={180}
          width={180}
          alt="three yellow orange"
        />

        <div className="w-full py-[45px] px-[20px] bg-[#FFFAF6] rounded-3xl">
          <p className="text-center pb-8 font-bold text-2xl text-[#614F3F]">
            Past Entries
          </p>
          {posts?.length > 0 ? renderPosts() : <p>No posts available</p>}
        </div>
      </div>
    </div>
  );
}
