"use client";
import React, {useEffect, useState} from "react";
import MainPage from "@/components/MainPage"
import { createUser } from "@/lib/api-controlers";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default async function Home() {
  const router = useRouter();

  async function creatNewUser(): Promise<void> {
    const newUser = {
      user_id: "1",
      email: "duanyulu1025@gmail.com",
      firstName: "Yulu",
      lastName: "Duan",
    };

    try {
      await createUser(newUser);
      // updateFlows(newflows);
      toast.success(`user ${newUser.firstName} created`, { duration: 2000 });
      router.push("/mindshift");
    } catch (error) {
      toast.error(`"Error while creating user: ${newUser.firstName}"`);
    }
  }

  return (
  //new Changes
      <main className="flex flex-col place-items-center h-screen bg-main">
        <button type="submit" onClick={creatNewUser}>
          Login
        </button>
        <MainPage />
      </main>
  )
}
