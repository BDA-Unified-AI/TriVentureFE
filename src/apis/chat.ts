import axios from "axios";
import { getCookie } from "../helpers/Cookies";
import { get } from "../utils/request";
import { API_DOMAIN } from "../constant";

export const chat = async (
  message: string,
  session_id: string | null,
  intent: string | null,
  history: {
    content: string | null;
    type: string;
  }[],
  language: string
): Promise<{
  status: number;
  data: { message: string; intent: string | null; tool_name: string | null };
}> => {
  try {
    const { status, data } = await axios.post(
      `${API_DOMAIN}llm/chat`,
      {
        message: message,
        session_id: session_id,
        intent: intent,
        history: history,
        language: language,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return { status, data };
  } catch (error) {
    console.error("Error sending chat message:", error);
    return {
      status: 500,
      data: {
        message: "Error sending chat message",
        intent: null,
        tool_name: null,
      },
    };
  }
};

export const list_chat_history = async () => {
  const result = await get("llm/list_chat_history");
  return result;
};
export const get_history = async (
  session_id: string | null
): Promise<{
  status: number;
  data: {
    message: Array<{ content: string; type: string }>;
    intent: string | null;
  };
}> => {
  try {
    const { status, data } = await axios.post(
      API_DOMAIN + "llm/get_chat_history",
      {
        session_id: session_id,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return { status, data };
  } catch (error) {
    console.error("Error sending chat message:", error);
    return { status: 500, data: { message: [], intent: null } };
  }
};
