"use client";

import React, { useState } from "react";
import axios from "axios";
import UsernameForm from "./components/UsernameForm";
import ChatWindow from "@/app/shared/components/ChatWindow";
import InputForm from "@/app/shared/components/InputForm";

const GithubModule: React.FC = () => {
  //   const [conversation, setConversation] = useState<string[]>([]);

  //   const handleRoastReceived = (roast: string) => {
  //     setConversation((prev) => [...prev, `Bot: ${roast}`]);
  //   };

  //   const handleMessageSubmit = async (message: string) => {
  //     setConversation((prev) => [...prev, `User: ${message}`]);
  //     const res = await axios.post("/api/chat", { message });
  //     setConversation((prev) => [...prev, `Bot: ${res.data.response}`]);
  //   };

  return (
    <main>
      <div className="grid place-items-center place-content-center h-[100vh]">
        <h3 className="text-6xl font-mono font-bold mb-6">Roast My Github!</h3>
        <UsernameForm />
        {/* <ChatWindow conversation={conversation} />
        <InputForm onMessageSubmit={handleMessageSubmit} /> */}
      </div>
    </main>
  );
};

export default GithubModule;
