"use client";
import React from "react";
import MainPage from "@/components/MainPage"

export default async function Home() {
  return (
      <main className="flex flex-col place-items-center h-screen bg-main">
        <MainPage />
      </main>
  )
}
