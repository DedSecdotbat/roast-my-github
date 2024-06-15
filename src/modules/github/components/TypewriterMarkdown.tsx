import React, { useState, useEffect, useRef, SetStateAction } from "react";
import ReactMarkdown from "react-markdown";

interface TypewriterMarkdownProps {
  text: string;
  setIsCompleted: React.Dispatch<SetStateAction<boolean>>;
  speed?: number;
}

const TypewriterMarkdown: React.FC<TypewriterMarkdownProps> = ({
  text,
  setIsCompleted,
  speed = 50,
}) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      // Ensure currentIndex is within the bounds of the text length
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        currentIndex++;
      } else {
        setIsCompleted(true);
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedText]);

  return (
    <div
      ref={containerRef}
      style={{ maxHeight: "500px", overflowY: "auto" }}
      className="no-scrollbar"
    >
      <ReactMarkdown>{displayedText.replace(/undefined/g, "")}</ReactMarkdown>
    </div>
  );
};

export default TypewriterMarkdown;
