"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { generateResponse } from "./generate";

export default function Mindshift() {
  const [generation, setGeneration] = useState("");
  const [userInput, setInput] = useState("");

  const getGeneration = (text: string) => {
    generateResponse(text).then((res) => setGeneration(res));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getGeneration(userInput);
  };

  return (
    <>
      <div>hello!</div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={userInput} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
      <div>response: {generation}</div>
    </>
  );
}
