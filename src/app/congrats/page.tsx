"use client";
import { readPostFromDatabase } from "@/lib/api-controlers";
import { useEffect, useState } from "react";

type Props = {};

const CongratsPage = (props: Props) => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const userId = "1";
    try {
      const data = await readPostFromDatabase(userId);
      setPost(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  return <div>hihi: {post}</div>;
};

export default CongratsPage;
