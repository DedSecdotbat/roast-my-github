"use client";

import React from "react";

interface ChatWindowProps {
  conversation: string[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation }) => {
  return (
    <div className="chat-window p-4 border rounded w-full max-w-lg">
      {conversation.map((message, index) => (
        <p key={index} className="mb-2">
          {message}
        </p>
      ))}
    </div>
  );
};

export default ChatWindow;
