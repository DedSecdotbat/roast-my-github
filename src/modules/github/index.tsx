"use client";

import React, { useState } from "react";
import axios from "axios";
import UsernameForm from "./components/UsernameForm";
import Typewriter from "typewriter-effect";
import ChatWindow from "@/shared/components/ChatWindow";
import InputForm from "@/shared/components/InputForm";
import Loader from "@/shared/components/Loader";
import { GithubRepoResponseProp } from "./types";

const GithubModule: React.FC = () => {
  //   const [conversation, setConversation] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  const [githubRepoData, setGithubRepoData] = useState<
    GithubRepoResponseProp[]
  >([]);

  const topGithubRepo = () => {
    let repoName = [];
    for (let i = 0; i < 10; i++) {
      if (githubRepoData[i]?.name === null || undefined) return;
      repoName.push(githubRepoData[i]?.name);
    }
    return repoName;
  };

  //   const handleRoastReceived = (roast: string) => {
  //     setConversation((prev) => [...prev, `Bot: ${roast}`]);
  //   };

  //   const handleMessageSubmit = async (message: string) => {
  //     setConversation((prev) => [...prev, `User: ${message}`]);
  //     const res = await axios.post("/api/chat", { message });
  //     setConversation((prev) => [...prev, `Bot: ${res.data.response}`]);
  //   };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main>
      <div className="grid grid-cols-2 place-items-center place-content-center h-[100vh]">
        <div className="grid gap-4 place-content-center place-items-center">
          <p className="text-5xl font-extrabold">Roast My Github!</p>
          <UsernameForm
            isLoading={isLoading}
            handleLoadingAction={(isLoading: boolean) =>
              setIsLoading(!isLoading)
            }
            handleGithubData={(githubData: GithubRepoResponseProp[]) =>
              setGithubRepoData(githubData)
            }
            username={username}
            setUsername={setUsername}
          />
        </div>
        <div className="blob-section animate-blob ">
          <div className="relative w-full max-w-lg ">
            <div className="absolute top-0 -right-4 w-20 h-20 md:w-36 md:h-36   bg-[#FA96C2] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-0 -left-4 w-20 h-20 md:w-36 md:h-36 bg-[#F65879] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob "></div>
            <div className="absolute -bottom-20 left-5 w-20 h-20 md:w-36 md:h-36 bg-[#FEA58F] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </div>
      </div>
    </main>
  );

  {
    /* <ChatWindow conversation={conversation} />
        <InputForm onMessageSubmit={handleMessageSubmit} /> */
  }
};

export default GithubModule;
