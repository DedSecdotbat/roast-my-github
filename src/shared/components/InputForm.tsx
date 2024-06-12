"use client";

import React, { useState } from "react";
import axios from "axios";

interface InputFormProps {
  onMessageSubmit: (message: string) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onMessageSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    onMessageSubmit(input);
    const res = await axios.post("/api/chat", { message: input });
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your response..."
        className="mb-4 p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Send
      </button>
    </form>
  );
};

export default InputForm;
