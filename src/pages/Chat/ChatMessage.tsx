import React, { useState, useEffect, useRef } from "react";
import {
  CloseOutlined,
  SendOutlined,
  ToolOutlined,
  RobotOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Input, notification, Select } from "antd";
import HotelCarousel from "./HotelCarousel";
import useAppState from "../../components/Context/state";
import { getCookie } from "../../helpers/Cookies";
import { openNotification } from "../../helpers/notification";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

const STORAGE_KEY = "chat_history_triventure";

const ChatMessage: React.FC<ChatMessageProps> = ({
  chatHistory = [],
  setChatHistory,
  setVisible,
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
  const [streamData, setStreamData] = useState<{
    type: string;
    content: string;
    intent: string | null;
    tool_name: string | null;
  }>({ type: "", content: "", intent: null, tool_name: null });

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const storedHistory = localStorage.getItem(STORAGE_KEY);
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory);
        setChatHistory(parsedHistory);
      } catch (error) {
        console.error("Error parsing stored chat history:", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  const clearChatHistory = () => {
    setChatHistory([]);
    localStorage.removeItem(STORAGE_KEY);
    openNotification(
      api,
      "success",
      "Chat history cleared",
      "Your chat history has been cleared successfully.",
      "topRight",
      3
    );
  };

  const intentOptions = [
    { value: null, label: "Primary" },
    { value: "book_hotel", label: "Book Hotel" },
    { value: "tourism", label: "Tourism" },
    { value: "vehicle", label: "Vehicle" },
    { value: "scheduling", label: "Scheduling" },
  ];
  const getCurrentIntentLabel = () => {
    const currentIntent = intentOptions.find(
      (option) => option.value === intent
    );
    return currentIntent ? currentIntent.label : "Primary";
  };

  const processStreamedData = (chunk: {
    type: string;
    content: string;
    intent: string | null;
    tool_name: string | null;
  }) => {
    if (chunk.type === "error") {
      setIsLoadingChat(false);
      setStreamData({ type: "", content: "", intent: "", tool_name: "" });
      
      // Add error message to chat history
      setChatHistory((pre: HistoryType[]) => [
        ...pre,
        { content: "Sorry, an error occurred: " + chunk.content, type: "ai" },
      ]);

      // Show error notification
      openNotification(
        api,
        "error",
        "Error in chat processing",
        <div className="text-black">{chunk.content}</div>,
        "topRight",
        5
      );
      return;
    }

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
    // Check if message is empty or contains only spaces
    if (message.trim() === "") {
      return; // Don't proceed with sending empty messages
    }

    setIsLoadingChat(true);
    setChatHistory((prev: HistoryType[]) => [
      ...prev,
      { content: message, type: "human" },
    ]);
    onStreamingMessage(message);
    setMessage("");
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
      <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg px-4 py-3 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <RobotOutlined className="text-2xl" />
            </motion.div>
            <div className="text-lg font-medium">
              AI {getCurrentIntentLabel()} Assistant
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={clearChatHistory}
              className="text-white hover:text-gray-200 transition-colors duration-300"
              title="Clear chat history"
            >
              <ClearOutlined className="text-xl" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setVisible && setVisible(false)}
              className="text-white hover:text-gray-200 transition-colors duration-300"
            >
              <CloseOutlined className="text-xl" />
            </motion.button>
          </div>
        </div>

        <div
          ref={chatContainerRef}
          className="flex-grow overflow-y-auto overflow-x-hidden p-4 space-y-4 bg-transparent scrollbar-thin scrollbar-thumb-indigo-300 "
        >
          {chatHistory.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm"
            >
              <RobotOutlined className="text-4xl text-blue-500 mb-3" />
              <p className="text-gray-600">
                {isLoadingChat
                  ? "No chat history"
                  : "Hello! How can I help you today?"}
              </p>
            </motion.div>
          )}
          <AnimatePresence>
            {chatHistory.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${
                  msg.type === "human" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl ${
                    msg.type === "human"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
                      : "bg-white/90 backdrop-blur-sm border border-gray-100 text-gray-800 shadow-sm"
                  } text-sm transition-all duration-300 ease-in-out hover:shadow-lg`}
                >
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
                      className={`prose prose-sm ${
                        msg.type === "ai" ? "text-gray-800" : "text-white"
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
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoadingChat && streamData.content !== "" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-[85%] p-4 rounded-2xl flex justify-start bg-white/90 backdrop-blur-sm border border-gray-100 text-gray-800 shadow-sm text-sm"
            >
              {streamData.type === "tool_call" ? (
                <div className="flex items-center space-x-2 text-orange-500">
                  <ToolOutlined className="text-xl" />
                  <span>Tool {streamData.content} calling...</span>
                </div>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="prose prose-sm text-gray-800"
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
            </motion.div>
          )}
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="flex items-center p-4 bg-white/80 backdrop-blur-sm border-t border-gray-100 space-x-3 rounded-b-lg"
        >
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="rounded-xl"
          />
          <Select
            value={intent}
            onChange={setIntent}
            className="w-24"
            placeholder="Intent"
            options={intentOptions}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl px-4 py-2 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
            disabled={isLoadingChat}
          >
            {isLoadingChat ? (
              <span className="flex items-center space-x-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <SendOutlined />
                </motion.span>
                <span>Sending...</span>
              </span>
            ) : (
              <SendOutlined />
            )}
          </motion.button>
        </form>
      </div>
    </>
  );
};

export default ChatMessage;
