"use client";

import Loader from "@/app/shared/components/Loader";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { GithubRepoResponseProp } from "../types";

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
      const res = await axios.post("/api/github", { username });
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
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center gap-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="p-2 border-b focus:outline-none bg-transparent"
        />
        <button
          type="button"
          className="text-divamecha hover:text-crimsonred hover:border-b hover:border-b-crimsonred font-bold"
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
