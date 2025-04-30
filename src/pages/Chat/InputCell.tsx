import { Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { BsSend } from "react-icons/bs";

interface InputCellProps {
  message: string;
  setMessage: (message: string) => void;
  intent: string | null;
  setIntent: (intent: string) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoadingChat: boolean;
  intentOptions: (
    | {
        value: null;
        label: string;
      }
    | {
        value: string;
        label: string;
      }
  )[];
}

const InputCell: React.FC<InputCellProps> = ({
  message,
  setMessage,
  intent,
  setIntent,
  handleFormSubmit,
  isLoadingChat,
  intentOptions,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleFormSubmit(e as any);
    }
  };
  return (
    <form
      onSubmit={handleFormSubmit}
      className="relative p-3 bg-white border-t border-gray-100"
    >
      <TextArea
        className="rounded-3xl h-20 pr-32"
        placeholder="Ask anything..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="absolute bottom-5 right-5 flex items-center gap-2">
        <Select
          value={intent}
          onChange={setIntent}
          className="w-full"
          placeholder="Intent"
          options={intentOptions}
        />
        <button
          type="submit"
          className="text-gray-500 rounded-xl px-4 py-2 flex items-center justify-center"
          disabled={isLoadingChat}
        >
          {isLoadingChat ? (
            "Processing..."
          ) : (
            <BsSend className="text-xl hover:scale-110" />
          )}
        </button>
      </div>
    </form>
  );
};

export default InputCell;
