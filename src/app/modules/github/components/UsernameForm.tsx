"use client";

import Loader from "@/app/shared/components/Loader";
import axios from "axios";
import { useState } from "react";

interface UsernameFormProps {
  onRoastAction?: (roast: string) => void;
}
const UsernameForm: React.FC<UsernameFormProps> = ({ onRoastAction }) => {
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleRoastBtn = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/github", { username });
      if (res?.data) {
        // onRoastAction(res?.data?.roast);
        setIsLoading(false);
      }
      setUsername("");
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
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
        onClick={(e) => {
          e.preventDefault();
          handleRoastBtn();
        }}
        disabled={isLoading}
      >
        Roast Me!
      </button>
    </div>
  );
};

export default UsernameForm;
