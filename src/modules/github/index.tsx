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
      <div className="grid place-items-center place-content-center h-[100vh]">
        <div>
          <h3 className="text-6xl font-mono font-bold mb-6 ">
            Roast My Github!
          </h3>
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
      </div>
    </main>
  );

  {
    /* <ChatWindow conversation={conversation} />
        <InputForm onMessageSubmit={handleMessageSubmit} /> */
  }
};

export default GithubModule;
