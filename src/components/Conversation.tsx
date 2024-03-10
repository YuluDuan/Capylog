"use client";
import Image from "next/image";
import { useChat } from "ai/react";
import Dialog from "./Dialog";
import { useEffect, useState } from "react";
import { readPostFromDatabase } from "@/lib/api-controlers";

const Conversation = ({haveReward} : {haveReward:boolean}) => {
  const { messages, input, handleInputChange, handleSubmit, data } = useChat();
  return (
    <>
      <div className="flex gap-32 px-12 py-10 justify-center">
        {
          haveReward
            ? <Image
                  height={250}
                  width={300}
                  src={"/assets/reward-capy.svg"}
                  alt="capylog logo"
              />
            : <Image
                  height={250}
                  width={300}
                  src={"/assets/capylog.svg"}
                  alt="award capy"
              />
        }

        <div className="flex flex-col h-[250px] w-[450px] relative items-start">
          <header className="text-center">
            <h1 className="text-l text-[#B18E71] font-semibold">
              Talk to Capy!
            </h1>
          </header>
          <div className="flex flex-col justify-between stretch overflow-y-auto py-4 scrollbar-hidden">
            <div className="flex-grow overflow-y-auto">
              {messages.map((m) => (
                <div key={m.id} className="whitespace-pre-wrap pt-2">
                  <Dialog text={m.content} role={m.role} />
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit}>
              <input
                className="absolute bottom-[-30px] max-w-md p-2 rounded-lg w-2/3 focus:outline-none mt-3"
                value={input}
                placeholder="Say something to Capy..."
                onChange={handleInputChange}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversation;
