"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { generateResponse } from "./generate";
import { useChat } from "ai/react";
import {
  readPostsFromDatabase,
  savePostToDatabase,
} from "@/lib/api-controlers";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";

interface PostType {
  id: string;
  original_text: string;
  revised_text: string;
  userId: string;
  created: Date;
}

export default function Mindshift() {
  const [generation, setGeneration] = useState("");
  const [userInput, setInput] = useState("");
  const { messages, input, handleInputChange, handleSubmit, data } = useChat();
  const [posts, setPosts] = useState<PostType[]>();

  // get the userid from auth
  const userId = "1";
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await readPostsFromDatabase(userId);
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [generation]);

  const getGeneration = (text: string) => {
    generateResponse(text).then((res) => setGeneration(res));
  };

  const handleUserChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getGeneration(userInput);
    //fetch from the auth
    const userId = "1";
    const id = uuidv4();

    const newPost: PostType = {
      id,
      original_text: userInput,
      revised_text: generation,
      userId,
      created: new Date(),
    };
    setPosts((prevPosts) => [...(prevPosts || []), newPost]);
    try {
      await savePostToDatabase({
        id,
        original_text: userInput,
        revised_text: generation,
        userId,
      });
      toast.success(`post created`, { duration: 2000 });
    } catch (error) {
      toast.error(`"Error while creating post`);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <textarea value={userInput} onChange={handleUserChange} />
        <button type="submit">Submit</button>
      </form>
      <div>response: {generation}</div>

      <div className="p-4">
        <header className="text-center">
          <h1 className="text-xl">Chat Example</h1>
        </header>
        <div className="flex flex-col justify-between w-full max-w-md mx-auto stretch">
          <div className="flex-grow overflow-y-auto">
            {messages.map((m) => (
              <div key={m.id} className="whitespace-pre-wrap">
                {m.role === "user" ? "User: " : "AI: "}
                {m.content}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
            />
          </form>
        </div>
      </div>
    </>
  );
}
