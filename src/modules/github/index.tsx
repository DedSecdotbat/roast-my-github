"use client";

import React, { useState } from "react";
import UsernameForm from "./components/UsernameForm";
import Loader from "@/shared/components/Loader";
import clsx from "clsx";
import TypewriterMarkdown from "./components/TypewriterMarkdown";
import axios from "axios";

const GithubModule: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isHuntingData, setIsHuntingData] = useState<boolean>(false);
  const [roastData, setRoastData] = useState<string | null>(null);

  const [huntingData, setHuntingData] = useState<string | null>(null);

  const handleHuntingFn = async () => {
    setRoastData(null);
    try {
      setIsHuntingData(true);
      const res = await axios.post("api/hunting-tips", { roastData });
      if (res?.status === 200) {
        setIsHuntingData(false);
        setHuntingData(res?.data?.roast);
      }
    } catch (error) {
      setIsHuntingData(false);
      console.log(error);
    }
  };

  return (
    <main>
      <div className="grid grid-cols-2 place-items-center place-content-center h-[100vh] maxMd:grid-cols-none maxMd:p-4">
        <div className="grid gap-4 place-content-center place-items-center">
          <div
            className={clsx({
              hidden:
                (isLoading && !roastData) ||
                (!isHuntingData && huntingData) ||
                huntingData ||
                roastData,
            })}
          >
            <p className={clsx("text-5xl font-extrabold")}>Roast My Github!</p>
          </div>
          {isLoading || isHuntingData ? (
            <div className="h-[150px] w-full">
              <Loader />
            </div>
          ) : null}
          {(!isLoading && roastData) || (!isHuntingData && huntingData) ? (
            <>
              <div className="h-[500px] w-full px-12 overflow-y-scroll no-scrollbar">
                <div className="grid gap-2 place-content-center place-items-center">
                  <TypewriterMarkdown
                    text={roastData || huntingData || ""}
                    speed={30}
                    setIsCompleted={setIsCompleted}
                  />
                </div>
              </div>
              <div className="flex gap-2 items-center">
                {isCompleted ? (
                  <button
                    className="bg-gradient-bg rounded-lg p-2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleHuntingFn();
                    }}
                  >
                    Generate Job Hunting Tips
                  </button>
                ) : null}

                {isCompleted ? (
                  <button
                    className="bg-gradient-bg rounded-lg p-2"
                    onClick={() => {
                      setRoastData(null);
                      setHuntingData(null);
                    }}
                  >
                    Roast Again!
                  </button>
                ) : null}
              </div>
            </>
          ) : null}
          {!isLoading && !roastData && !isHuntingData && !huntingData ? (
            <UsernameForm
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              handleGithubData={(roast: string) => setRoastData(roast)}
              username={username}
              setUsername={setUsername}
            />
          ) : null}
        </div>
        <div className="blob-section animate-blob ">
          <div className="relative w-full max-w-lg -top-[200px]">
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
