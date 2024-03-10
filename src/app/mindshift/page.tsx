"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { generateResponse } from "./generate";
import { classifyResponse } from "./classify";
import { useChat } from "ai/react";

export default function Mindshift() {
  const [generation, setGeneration] = useState("");
  const [classification, setClassification] = useState("");
  const [userInput, setInput] = useState("");
  const { messages, input, handleInputChange, handleSubmit, data } = useChat();

  const getGeneration = (text: string) => {
    generateResponse(text).then((res) => setGeneration(res));
  };

  const getClassification = () => {
    classifyResponse("").then((res) => setClassification(res));
  };

  const handleUserChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getGeneration(userInput);
    getClassification();
  };

  return (
    <>
      <div>hello!</div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={userInput} onChange={handleUserChange} />
        <button type="submit">Submit</button>
      </form>
      <div>response: {generation}</div>
      <div>classify score: {classification}</div>

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
