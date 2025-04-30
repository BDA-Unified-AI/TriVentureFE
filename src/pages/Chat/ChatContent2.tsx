import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { get_history } from "../../apis/chat";
import ChatMessage from "./ChatMessage2";
import useAppState from "../../components/Context/state";

type HistoryType = {
  content: string | null;
  type: "human" | "ai";
};

interface ChatProps {
  sessionId?: string | null;
  setVisible?: (visible: boolean) => void;
}
const ChatContent: React.FC<ChatProps> = ({ sessionId, setVisible }) => {
  const [chatHistory, setChatHistory] = useState<HistoryType[]>([]);
  const setIntent = useAppState((state) => state.setIntent);
  const getChatHistory = async (session_id: string | null) => {
    const response = await get_history(session_id);
    if (response.status === 200) {
      const historyData: HistoryType[] = response.data.message.map(
        (msg: { content: string; type: string }) => ({
          content: msg.content,
          type: msg.type as "human" | "ai",
        })
      );
      setChatHistory(historyData.slice(-20));
      setIntent(response.data.intent);
    }
  };

  useEffect(() => {
    getChatHistory(sessionId ?? null);
  }, []);

  return (
    <>
      <ChatMessage
        setVisible={setVisible}
        chatHistory={chatHistory}
        setChatHistory={setChatHistory}
      />
      <div />
    </>
  );
};

export default ChatContent;
