import { Button, Input } from "antd";
import React from "react";
import { SendOutlined } from "@ant-design/icons";
interface CommentInputProps {
  commentText: string;
  setCommentText: React.Dispatch<React.SetStateAction<string>>;
  handleAddComment: () => void;
  isSubmitting: boolean;
  commentInputRef: React.RefObject<any>;
}

const CommentInput: React.FC<CommentInputProps> = ({
  commentText,
  setCommentText,
  handleAddComment,
  isSubmitting,
  commentInputRef,
}) => {
  return (
    <>
      <div className="mt-4 flex items-center gap-2 border-t pt-3 bg-white p-3 rounded-lg shadow-md">
        <div className="flex-grow relative rounded-lg overflow-hidden border border-gray-200 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-300 transition-all">
          <Input.TextArea
            ref={commentInputRef}
            placeholder="Viết bình luận..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevent new line when pressing Enter
                handleAddComment();
              }
            }}
            autoSize={{ minRows: 1, maxRows: 4 }}
            disabled={isSubmitting}
            className="border-0 focus:ring-0 focus:outline-none p-3 resize-none"
            style={{ boxShadow: "none" }}
          />
        </div>

        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleAddComment}
          loading={isSubmitting}
          disabled={!commentText.trim() || isSubmitting}
          className="h-full px-5 flex items-center justify-center rounded-lg shadow-md"
          style={{
            background: commentText.trim() ? "#1890ff" : "#f0f0f0",
            color: commentText.trim() ? "white" : "#bfbfbf",
            transition: "all 0.3s",
            alignSelf: "stretch",
            minHeight: "44px",
          }}
        >
          <span>Gửi</span>
        </Button>
      </div>
    </>
  );
};

export default CommentInput;
