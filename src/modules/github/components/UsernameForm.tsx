"use client";

import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import clsx from "clsx";

interface UsernameFormProps {
  onRoastAction?: (roast: string) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  handleGithubData: (roastData: string) => void;
}
const UsernameForm: React.FC<UsernameFormProps> = ({
  onRoastAction,
  isLoading,
  handleGithubData,
  username,
  setUsername,
  setIsLoading,
}) => {
  const [error, setError] = useState<string | null>(null);
  const handleRoastBtn = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("api/github", { username });
      if (res?.status === 200) {
        setIsLoading(false);
      }
      if (res?.data) {
        handleGithubData(res?.data?.roast);
      }
      setUsername("");
    } catch (error) {
      setIsLoading(false);
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
        <div
          className={clsx(
            "border-2 bg-transparent border-gray-300 border-opacity-40 rounded-lg w-full",
            { "!border-crimsonred": error }
          )}
        >
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setError(null);
              setUsername(e.target.value);
            }}
            placeholder="Enter GitHub username"
            className="p-2 focus:outline-none bg-transparent w-full placeholder:text-richBlack"
          />
        </div>
        <button
          type="button"
          className="font-bold p-2 bg-gradient-bg rounded-lg"
          onClick={(e) => {
            e.preventDefault();
            if (username.trim().length > 0) {
              return handleRoastBtn();
            }
            setError("UserName Cannot be Empty");
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
