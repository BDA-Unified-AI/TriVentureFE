import React, { useState, useEffect } from "react";
import { getCookie } from "../../helpers/Cookies";
import useAppState from "../../components/Context/state";
import ChatMessage from "./ChatMessage";
import { Spin } from "antd";

const STORAGE_KEYS = {
  CHAT_HISTORY: "chat_history_triventure",
  INTENT: "chat_intent",
};

interface ChatContentProps {
  sessionId?: string | null;
  setVisible?: (visible: boolean) => void;
}

const ChatContent: React.FC<ChatContentProps> = ({
  sessionId,
  setVisible,
}) => {
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [isLoadingChat, setIsLoadingChat] = useState<boolean>(true);
  const setIntent = useAppState((state) => state.setIntent);
  const intent = useAppState((state) => state.intent);

  useEffect(() => {
    const loadStoredData = () => {
      const storedHistory = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
      const storedIntent = localStorage.getItem(STORAGE_KEYS.INTENT);
      console.log(storedHistory, storedIntent);
      if (storedHistory && storedIntent) {
        try {
          const parsedHistory = JSON.parse(storedHistory);
          const parsedIntent = JSON.parse(storedIntent);
          setChatHistory(parsedHistory);
          setIntent(parsedIntent);
          setIsLoadingChat(false);
          return true;
        } catch (error) {
          console.error("Error parsing stored data:", error);
          localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
          localStorage.removeItem(STORAGE_KEYS.INTENT);
        }
      }
      return false;
    };

    const fetchHistory = async () => {
      if (loadStoredData()) {
        return; // If we successfully loaded from localStorage, don't fetch from API
      }

      try {
        const response = await fetch(
          `https://abao77-triventure-be.hf.space/llm/get_history/${sessionId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch chat history");
        }

        const data = await response.json();
        if (data && data.history) {
          setChatHistory(data.history);
          setIntent(data.intent);

          // Store the fetched data in localStorage
          localStorage.setItem(
            STORAGE_KEYS.CHAT_HISTORY,
            JSON.stringify(data.history)
          );
          localStorage.setItem(
            STORAGE_KEYS.INTENT,
            JSON.stringify(data.intent)
          );
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      } finally {
        setIsLoadingChat(false);
      }
    };

    fetchHistory();
  }, [sessionId, setIntent]);

  // Save intent to localStorage whenever it changes
  useEffect(() => {
    if (intent !== null) {
      localStorage.setItem(STORAGE_KEYS.INTENT, JSON.stringify(intent));
    }
  }, [intent]);

  if (isLoadingChat) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="h-full">
        <ChatMessage
        chatHistory={chatHistory}
        setChatHistory={setChatHistory}
        setVisible={setVisible}
      />
    </div>
  );
};

export default ChatContent;
