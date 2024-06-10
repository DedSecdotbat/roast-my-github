"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [username, setUsername] = useState("");
  const [conversation, setConversation] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleRoastBtn = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.post("/api/roast", { username });
      const data = res.data;
      setConversation((prev) => [
        ...prev,
        `User: ${username}`,
        `Bot: ${data.roast}`,
      ]);
      setUsername("");
    } catch (error) {
      console.error("Error fetching roast:", error);
    }
  };

  const handleInputSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setConversation((prev) => [...prev, `User: ${input}`]);
      const res = await axios.post("/api/chat", { message: input });
      const data = res.data;
      setConversation((prev) => [...prev, `Bot: ${data.response}`]);
      setInput("");
    } catch (error) {
      console.error("Error continuing conversation:", error);
    }
  };

  return (
    <main className="h-full overflow-hidden">
      <div className="grid place-content-center place-items-center gap-4">
        <h3 className="text-6xl text-center p-4 w-full">Roast My Github!</h3>
        <div className="flex justify-center items-center w-full gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="p-2 border bg-transparent rounded"
          />
          <button
            type="button"
            className="text-divamecha hover:text-crimsonred hover:border-b hover:border-b-crimsonred font-bold"
            onClick={(e) => handleRoastBtn(e)}
          >
            Roast Me!
          </button>
        </div>
      </div>
      <div className="grid place-items-center place-content-center w-full h-[calc(100vh-150px)]">
        <div className="chat-window p-4 border rounded w-full max-w-lg">
          {conversation.map((message, index) => (
            <p key={index} className="mb-2">
              {message}
            </p>
          ))}
        </div>
        <form
          onSubmit={handleInputSubmit}
          className="flex justify-center items-center gap-4 p-4"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your response..."
            className="p-2 border rounded"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Send
          </button>
        </form>
      </div>
    </main>
  );
}
