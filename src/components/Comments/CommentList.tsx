import {
  Avatar,
  Button,
  Dropdown,
  Input,
  List,
  Menu,
  message,
  Spin,
} from "antd";
import React, { useEffect, useCallback, useState, useRef } from "react";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { timeAgo } from "../../utils/timeAgo";
import { UserInfo } from "../../apis/auth";
import { Comment } from "../Post/types";
import { deleteComment, updateComment } from "../../apis/comment";

interface CommentListProps {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  loading: boolean;
  userInfo: UserInfo | null;
  commentsContainerRef: React.RefObject<HTMLDivElement>;
  fetchComments: () => void;
  commentInputRef: React.RefObject<any>;
  scrollToBottom: () => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  setComments,
  loading,
  userInfo,
  commentsContainerRef,
  fetchComments,
  commentInputRef,
  scrollToBottom,
}) => {
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const initialRenderRef = useRef(true);

  // Scroll when comments change or on initial render
  useEffect(() => {
    // Always scroll on initial render if there are comments
    if (initialRenderRef.current && comments.length > 0) {
      initialRenderRef.current = false;
      setTimeout(scrollToBottom, 100);
      return;
    }

    // Scroll when comments change (additional comments added)
    if (comments.length > 0) {
      setTimeout(scrollToBottom, 100);
    }
  }, [comments, scrollToBottom]);

  // Force scroll on component mount
  useEffect(() => {
    // Additional safety to ensure scroll happens when component mounts
    if (comments.length > 0) {
      const timer = setTimeout(scrollToBottom, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleStartEdit = useCallback((comment: Comment) => {
    setEditingComment(comment.id);
    setEditText(comment.content);
  }, []);

  const handleSaveEdit = async () => {
    if (!editingComment || !editText.trim()) return;

    // Find the comment being edited
    const commentToUpdate = comments.find(
      (comment) => comment.id === editingComment,
    );
    if (!commentToUpdate) return;

    const updatedContent = editText.trim(); // Store content to avoid closure issues

    try {
      // First update UI optimistically
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === editingComment
            ? {
                ...comment,
                content: updatedContent,
                updated_at: new Date().toISOString(),
              }
            : comment,
        ),
      );

      // Clear edit mode
      setEditingComment(null);

      // Then send request to server
      const response = await updateComment(editingComment, {
        content: updatedContent,
      });

      if (response.status === 200 && response.data?.message) {
        message.success("Bình luận đã được cập nhật!");
      } else {
        message.error("Lỗi khi cập nhật bình luận.");
        // Revert to original on error
        fetchComments();
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi không xác định.");
      // Revert to original on error
      fetchComments();
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      // Optimistically remove from UI
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId),
      );

      const response = await deleteComment(commentId);

      if (response.status === 200 && response.data?.message) {
        message.success("Bình luận đã được xóa!");
      } else {
        message.error("Lỗi khi xóa bình luận.");
        fetchComments();
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi không xác định.");
      fetchComments();
    }
  };

  return (
    <div
      ref={commentsContainerRef}
      className="h-[400px] overflow-y-auto p-3 bg-gray-50 rounded-lg shadow-inner"
    >
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spin />
        </div>
      ) : (
        <List
          dataSource={comments}
          renderItem={(comment) => (
            <List.Item className="border-b last:border-0 py-2">
              <List.Item.Meta
                avatar={<Avatar src={comment.user_info?.picture} />}
                title={
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-blue-700">
                      {comment.user_info?.name}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {timeAgo(comment.created_at)}
                      </span>

                      {/* Only show edit/delete dropdown for the current user's comments */}
                      {comment.user_id === userInfo?.id && (
                        <Dropdown
                          overlay={
                            <Menu>
                              <Menu.Item
                                key="edit"
                                icon={<EditOutlined />}
                                onClick={() => handleStartEdit(comment)}
                              >
                                Cập nhật
                              </Menu.Item>
                              <Menu.Item
                                key="delete"
                                icon={<DeleteOutlined />}
                                danger
                                onClick={() => handleDeleteComment(comment.id)}
                              >
                                Xóa
                              </Menu.Item>
                            </Menu>
                          }
                          trigger={["click"]}
                        >
                          <Button
                            type="text"
                            icon={<MoreOutlined />}
                            className="text-gray-500 hover:text-black"
                          />
                        </Dropdown>
                      )}
                    </div>
                  </div>
                }
                description={
                  editingComment === comment.id ? (
                    <div className="mt-1">
                      <Input.TextArea
                        value={editText}
                        ref={commentInputRef}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSaveEdit();
                          }
                        }}
                        autoSize={{ minRows: 1, maxRows: 4 }}
                        className="mb-2 border border-blue-300 rounded-md"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          size="small"
                          onClick={() => setEditingComment(null)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md transition duration-200"
                        >
                          Hủy
                        </Button>
                        <Button
                          type="primary"
                          size="small"
                          onClick={handleSaveEdit}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
                        >
                          Cập nhật
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-700 bg-white p-2 rounded-md shadow-sm">
                        {comment.content}
                      </p>
                    </div>
                  )
                }
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default CommentList;
