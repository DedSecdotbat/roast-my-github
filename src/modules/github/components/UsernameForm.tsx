"use client";

import Loader from "@/shared/components/Loader";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { GithubRepoResponseProp } from "../types";
import img from "../../../assets/img/img.jpg";

interface UsernameFormProps {
  onRoastAction?: (roast: string) => void;
  isLoading: boolean;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  handleLoadingAction: (isLoading: boolean) => void;
  handleGithubData: (githubData: GithubRepoResponseProp[]) => void;
}
const UsernameForm: React.FC<UsernameFormProps> = ({
  onRoastAction,
  isLoading,
  handleLoadingAction,
  handleGithubData,
  username,
  setUsername,
}) => {
  const handleRoastBtn = async () => {
    try {
      handleLoadingAction;
      const res = await axios.post("api/github", { username });
      if (res?.data) {
        handleGithubData(res?.data?.github_repo_data);
        handleLoadingAction(!isLoading);
      }
      setUsername("");
    } catch (error) {
      handleLoadingAction(!isLoading);
      console.log(error);
    }
  };
  return (
    <div
      className="h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100
"
    >
      <div className="flex gap-2 justify-start items-center p-2">
        <div className="h-4 w-4 rounded-full bg-ponceau opacity-25"></div>
        <div className="h-4 w-4 rounded-full bg-coralSenader opacity-30"></div>
        <div className="h-4 w-4 rounded-full bg-pastelMagenta opacity-35"></div>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center p-2">
        <div className="border-2 bg-transparent border-gray-300 border-opacity-40 rounded-lg w-full">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="p-2 focus:outline-none bg-transparent placeholder:text-richBlack"
          />
        </div>
        <button
          type="button"
          className="font-bold p-2 bg-gradient-bg rounded-lg"
          onClick={(e) => {
            e.preventDefault();
            handleRoastBtn();
          }}
          disabled={isLoading}
        >
          Roast Me!
        </button>
      </div>
    </div>
  );
};

export default UsernameForm;
