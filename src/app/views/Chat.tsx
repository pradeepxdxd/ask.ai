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
    if (!input.trim()) return;
    setLoader(true);

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
              {loader ? (
                <>
                  <svg
                    aria-hidden="true"
                    className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </>
              ) : (
                <>
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
                </>
              )}
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
                    {/* <h6>
                      {msg.text.split("\n").map((line, lineIndex) => (
                        <span key={lineIndex}>
                          {line}
                          <br />
                          <pre />
                        </span>
                      ))}
                    </h6> */}
                    <pre className="whitespace-pre-wrap break-words">{msg.text}</pre>
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
