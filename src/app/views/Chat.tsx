"use client";
import axios from "axios";
import React, { useState } from "react";
import Typing from "../components/ui/Typing";
import Title from "../components/ui/Title";

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<{ user: boolean; text: string }[]>(
    []
  );

  const [input, setInput] = useState("");
  const [loader, setLoader] = useState<boolean>(false);

  const sendMessage = async () => {
    setLoader(true);
    if (!input.trim()) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_OPENAI_BASE_URL}/api/v1/openai`,
        {
          text: input,
        }
      );

      const ai_repsonse = response.data.response;

      setMessages((prev) => [
        ...prev,
        { user: true, text: input },
        {
          user: false,
          text: ai_repsonse,
        },
      ]);
      setInput("");
    } catch (err) {
      console.log(err);
      setInput("Something went wrong with the server, please try again later");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {messages.length === 0 ? (
        <div
          className="min-h-screen bg-black flex flex-col items-center text-white"
          style={{ marginTop: "10rem" }}
        >
          <Title />
          <h1 className="text-3xl font-semibold mb-8">What can I help with?</h1>
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message ChatGPT"
              className="w-full bg-gray-800 text-gray-300 rounded-full py-3 pl-10 pr-16 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a2 2 0 10-2.828-2.828z"
                />
              </svg>
            </div>
            <button
              onClick={sendMessage}
              disabled={loader}
              className="absolute inset-y-0 right-0 flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
          <div className="mt-8 flex space-x-4">
            <button className="bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 px-4 rounded-full xs:py-1 xs:px-2 xs:text-sm">
              Create idea&apos;s
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 px-4 rounded-full xs:py-1 xs:px-2 xs:text-sm">
              Help me write
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 px-4 rounded-full xs:py-1 xs:px-2 xs:text-sm">
              Analyze text
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 px-4 rounded-full xs:py-1 xs:px-2 xs:text-sm">
              Summarize text
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col h-screen bg-gray-800 text-white">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.user ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[60rem] p-3 rounded-lg ${
                      msg.user
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    <h6>
                      {msg.text.split("\n").map((line, lineIndex) => (
                        <span key={lineIndex}>
                          {line}
                          <br />
                          <pre />
                        </span>
                      ))}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
            {loader && (
              <div className={`flex ${loader && "justify-start"}`}>
                <Typing />
              </div>
            )}
            <div className="p-4 bg-gray-900">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 rounded-lg bg-gray-700 text-white border-none focus:ring focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  disabled={loader}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChatInterface;
