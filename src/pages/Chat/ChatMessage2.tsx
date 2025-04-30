import React, { useState, useEffect, useRef } from "react";
import { ToolOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notification } from "antd";
import HotelCarousel from "./HotelCarousel";
import useAppState from "../../components/Context/state";
import { getCookie } from "../../helpers/Cookies";
import { openNotification } from "../../helpers/notification";
import { NavLink } from "react-router-dom";
import InputCell from "./InputCell";
import { RiRobot2Line } from "react-icons/ri";
import { API_DOMAIN } from "../../constant";
type HistoryType = {
  content: string | null;
  type: "human" | "ai";
};

interface ChatMessageProps {
  chatHistory: HistoryType[];
  setChatHistory: React.Dispatch<React.SetStateAction<HistoryType[]>>;

  setVisible?: (visible: boolean) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  chatHistory = [],
  setChatHistory,
}) => {
  // const url = "http://localhost:3002/llm/chat_streaming";
  let url = "";
  if (getCookie("token")) {
    url = API_DOMAIN + "llm/chat_streaming";
  } else {
    url = API_DOMAIN + "llm/chat_streaming_guest";
  }

  const [message, setMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const language = useAppState((state) => state.language);
  const setIntent = useAppState((state) => state.setIntent);
  const intent = useAppState((state) => state.intent);
  const [isLoadingChat, setIsLoadingChat] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const userInfo = useAppState((state) => state.userInfo);
  const [streamData, setStreamData] = useState<{
    type: string;
    content: string;
    intent: string | null;
    tool_name: string | null;
  }>({ type: "", content: "", intent: null, tool_name: null });

  const intentOptions = [
    { value: null, label: "Primary" },
    { value: "book_hotel", label: "Book Hotel" },
    { value: "scheduling", label: "Scheduling" },
  ];

  const processStreamedData = (chunk: {
    type: string;
    content: string;
    intent: string | null;
    tool_name: string | null;
  }) => {
    if (chunk.type === "tool_call" || chunk.type === "message") {
      setStreamData(chunk);
    }
    if (chunk.type === "final") {
      const newMessage = chunk.content;
      setIsLoadingChat(false);
      setStreamData({ type: "", content: "", intent: "", tool_name: "" });

      setChatHistory((pre: HistoryType[]) => [
        ...pre,
        { content: newMessage, type: "ai" },
      ]);
      setIntent(chunk.intent);

      if (chunk.tool_name) {
        openNotification(
          api,
          "info",
          chunk.tool_name + " has been invoked",
          <div className="text-black">
            Direct to{" "}
            <NavLink className="text-primary-200" to="/schedule">
              Schedule Calendar
            </NavLink>{" "}
            to check.
          </div>,
          "topRight",
          3
        );
      }
    }
  };

  const onStreamingMessage = async (message: string) => {
    const data = {
      message: message,
      session_id: null,
      intent: intent,
      history: chatHistory,
      language: language,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`, // Add the Bearer token here
        },
        body: JSON.stringify(data),
      });
      if (!response.body) {
        throw new Error("No response body");
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        let lines = buffer.split("\n");

        for (let i = 0; i < lines.length - 1; i++) {
          try {
            const chunk = JSON.parse(lines[i]);
            processStreamedData(chunk);
          } catch (parseError) {
            console.error("Failed to parse chunk:", parseError, lines[i]);
          }
        }

        buffer = lines[lines.length - 1];
      }
      if (buffer) {
        try {
          const chunk = JSON.parse(buffer);
          processStreamedData(chunk);
        } catch (parseError) {
          console.error("Failed to parse chunk:", parseError, buffer);
        }
      }
    } catch (error) {
      console.error("Failed to get data:", error);
    }
  };
  const handleSend = (message: string) => {
    setIsLoadingChat(true);
    if (message.trim() !== "") {
      setChatHistory((prev: HistoryType[]) => [
        ...prev,
        { content: message, type: "human" },
      ]);
      onStreamingMessage(message);
      setMessage("");
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoadingChat) return;
    handleSend(message);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, streamData]);

  return (
    <>
      {contextHolder}
      <div className="flex flex-col h-screen">
        <div
          ref={chatContainerRef}
          className="relative flex-grow overflow-y-auto overflow-x-hidden p-4 space-y-3"
        >
          {chatHistory.length === 0 && (
            <div className="text-center bg-white p-3 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500 animate-pulse">
                {isLoadingChat ? "No chat history" : "Loading history..."}
              </p>
            </div>
          )}
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`block ${msg.type === "human" ? "" : ""}`}
            >
              <div
                className={`w-full p-3  ${
                  msg.type === "human"
                    ? "flex items-center gap-2"
                    : "bg-white border-y text-gray-800 hover:bg-gray-50 hover:border-white hover:rounded-3xl "
                } text-sm transition-all duration-300 ease-in-out`}
              >
                {msg.type == "human" ? (
                  <img
                    src={userInfo?.picture}
                    className="object-cover w-8 h-8 rounded-full"
                  />
                ) : (
                  <RiRobot2Line className="object-cover w-8 h-8 p-1 rounded-full bg-black text-white" />
                )}

                {msg.content && msg.content.startsWith("search_hotels_") ? (
                  <HotelCarousel
                    type={
                      ["luxury", "popular", "basic"].find(
                        (term) => msg.content && msg.content.includes(term)
                      ) || "popular"
                    }
                    handleSend={handleSend}
                  />
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className={`prose prose-sm break-words text-base ${
                      msg.type === "ai"
                        ? "text-gray-800 font-normal"
                        : "text-gray-800 font-medium"
                    }`}
                    components={{
                      a: ({ ...props }) => (
                        <a
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-600"
                        />
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          ))}
          {isLoadingChat && streamData.content !== "" && (
            <div className="max-w-[90%] p-3 rounded-2xl flex justify-start bg-white border border-gray-200 text-gray-800 shadow-sm text-sm">
              {streamData.type === "tool_call" ? (
                <div className="flex items-center space-x-2 text-orange-500">
                  <ToolOutlined className="text-xl" />
                  <span>Tool {streamData.content} calling...</span>
                </div>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className={`prose prose-sm text-gray-800 `}
                  components={{
                    a: ({ ...props }) => (
                      <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600"
                      />
                    ),
                  }}
                >
                  {streamData.content !== "" ? streamData.content : null}
                </ReactMarkdown>
              )}
            </div>
          )}
        </div>
        <InputCell
          message={message}
          setMessage={setMessage}
          intent={intent}
          setIntent={setIntent}
          handleFormSubmit={handleFormSubmit}
          isLoadingChat={isLoadingChat}
          intentOptions={intentOptions}
        />
      </div>
    </>
  );
};

export default ChatMessage;
