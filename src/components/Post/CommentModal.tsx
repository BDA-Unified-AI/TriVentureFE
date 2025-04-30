import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  Card,
  Avatar,
  Image,
  List,
  Input,
  Button,
  Spin,
  message,
  Dropdown,
  Menu,
} from "antd";
import {
  SendOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../../apis/comment";
import { Comment, Post } from "./types";
import { timeAgo } from "../../utils/timeAgo";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { getDestinationDetail } from "../../apis/dest";
import ContentDisplay from "../../utils/ContentDisplay";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import useAppState from "../Context/state";

interface CommentModalProps {
  post: Post;
  isModalOpen: boolean;
  closeModal: () => void;
  onCommentAdded: () => void;
  onCommentDeleted: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  post,
  isModalOpen,
  closeModal,
  onCommentAdded,
  onCommentDeleted,
}) => {
  const { t } = useTranslation();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const userInfo = useAppState((state) => state.userInfo);
  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const commentInputRef = useRef<any>(null);
  const mainSwiperRef = useRef<any>(null);
  const thumbsSwiperRef = useRef<any>(null);
  const [destinationName, setDestinationName] = useState<string>("");

  const scrollToBottom = () => {
    if (commentsContainerRef.current) {
      const container = commentsContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  };
  useEffect(() => {
    if (comments.length > 0) {
      setTimeout(scrollToBottom, 100);
    }
  }, [comments, scrollToBottom]);
// 
  useEffect(() => {
    if (isModalOpen && !loading && comments.length > 0) {
      setTimeout(scrollToBottom, 300);
    }
  }, [isModalOpen, loading, comments.length, scrollToBottom]);

  useEffect(() => {
    if (post.destination_id && !destinationName) {
      getDestinationDetail(post.destination_id).then((res) => {
        setDestinationName(res.name || "Không xác định");
      });
    }
  }, [post.destination_id, destinationName]);

  useEffect(() => {
    if (isModalOpen && post.picture && post.picture.length > 0) {
      // Reset swipers when modal opens
      mainSwiperRef.current = null;
      thumbsSwiperRef.current = null;
    }
  }, [isModalOpen, post.picture]);

  const fetchComments = async () => {
    if (!post.id) return;
    setLoading(true);
    try {
      const response = await getComments(post.id);
      if (response.status === 200 && Array.isArray(response.data?.message)) {
        setComments(response.data.message);
      } else {
        setComments([]);
      }
    } catch (error) {
      message.error("Không thể tải bình luận.");
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchComments();
    }
  }, [isModalOpen]);

  const handleAddComment = async () => {
    if (!commentText.trim() || !userInfo) return;
    setIsSubmitting(true);

    const tempId = Date.now().toString();

    const newComment: Comment = {
      id: tempId,
      content: commentText,
      post_id: post.id,
      user_id: userInfo.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_info: {
        name: userInfo.name,
        picture: userInfo.picture,
        user_id: userInfo.id,
      },
    };

    setComments((prevComments) => [...prevComments, newComment]);

    setCommentText("");
    setTimeout(scrollToBottom, 100);

    try {
      const response = await createComment({
        post_id: post.id,
        content: commentText,
      });

      if (
        (response.status === 200 || response.status === 201) &&
        response.data?.message
      ) {
        message.success("Bình luận đã được gửi!");
        const commentId = response.data.message;

        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === tempId ? { ...comment, id: commentId } : comment
          )
        );
        onCommentAdded();
      } else {
        setComments((prevComments) =>
          prevComments.filter((c) => c.id !== tempId)
        );
        message.error("Lỗi khi gửi bình luận.");
      }
    } catch (error) {
      setComments((prevComments) =>
        prevComments.filter((c) => c.id !== tempId)
      );
      message.error("Đã xảy ra lỗi không xác định.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        if (commentInputRef.current) {
          commentInputRef.current.focus();
        }
      }, 100);
    }
  };
  const handleStartEdit = (comment: Comment) => {
    setEditingComment(comment.id);
    setEditText(comment.content);
  };

  const handleSaveEdit = async () => {
    if (!editingComment || !editText.trim()) return;

    // Find the comment being edited
    const commentToUpdate = comments.find(
      (comment) => comment.id === editingComment
    );
    if (!commentToUpdate) return;

    try {
      // First update UI optimistically
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === editingComment
            ? {
                ...comment,
                content: editText,
                updated_at: new Date().toISOString(),
              }
            : comment
        )
      );

      // Clear edit mode
      setEditingComment(null);

      // Then send request to server
      const response = await updateComment(editingComment, {
        content: editText,
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
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );

      const response = await deleteComment(commentId);

      if (response.status === 200 && response.data?.message) {
        message.success("Bình luận đã được xóa!");
        onCommentDeleted();
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
  <Modal
    open={isModalOpen}
    onCancel={closeModal}
    footer={null}
    width="100%"
    className="rounded-lg max-w-[95vw] md:max-w-[1300px]"
    bodyStyle={{
      height: "70vh",
      padding: 0,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}
  >
    <div className="flex flex-col md:flex-row h-full overflow-hidden">
      {/* Post Content Section */}
      <div className="w-full md:w-1/2 overflow-y-auto p-4">
        <Card
          bordered={false}
          className="shadow-lg rounded-none md:rounded-lg bg-white"
          bodyStyle={{ padding: "16px" }}
        >
          {/* User Info Section */}
          <div className="flex space-x-3">
            {/* Avatar */}
            <Avatar src={post.user_info?.picture} size={40} />

              {/* Name and Location Info */}
              <div className="flex flex-col flex-1">
                <span className="font-semibold text-base md:text-lg">
                  {post.user_info?.name}
                </span>
                <div className="flex items-center text-sm space-x-2">
                  <NavLink
                    to={`/destination/${post.destination_id}`}
                    className="text-blue-600 hover:text-blue-700 hover:underline flex items-center"
                  >
                    <EnvironmentOutlined className="mr-1" />
                    {destinationName}
                  </NavLink>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-500">
                    {timeAgo(post.created_at)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-700 whitespace-pre-wrap">
                {post.content}
              </p>
            </div>

            {post.picture && post.picture.length > 0 && (
              <div className="mt-4">
                <div className="image-gallery">
                  {post.picture.length === 1 ? (
                    // Single image display
                    <div className="flex justify-center items-center bg-gray-50 rounded-lg overflow-hidden">
                      <Image
                        src={post.picture[0]}
                        alt="Post image"
                        className="rounded-lg object-contain"
                        style={{ maxHeight: "400px", width: "100%" }}
                        preview={{
                          mask: <div className="text-white">Xem đầy đủ</div>,
                        }}
                      />
                    </div>
                  ) : (
                    // Multiple images slider
                    <div className="relative">
                      <Swiper
                        modules={[Navigation, Thumbs]}
                        navigation
                        loop={post.picture.length > 1}
                        thumbs={{ swiper: thumbsSwiperRef.current }}
                        className="rounded-lg overflow-hidden shadow-md"
                      >
                        {post.picture.map((pic, index) => (
                          <SwiperSlide key={index}>
                            <div className="flex justify-center items-center w-full h-[250px] md:h-[400px] rounded-lg bg-gray-100">
                              <Image
                                src={pic}
                                alt={`Post image ${index + 1}`}
                                className="max-h-full max-w-full object-contain"
                                preview={{
                                  mask: (
                                    <div className="text-white">Xem đầy đủ</div>
                                  ),
                                }}
                                placeholder={
                                  <div className="flex justify-center items-center h-full w-full">
                                    <Spin />
                                  </div>
                                }
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>

                      {/* {post.picture.length > 1 && (
                        <Swiper
                          onSwiper={(swiper) => {
                            thumbsSwiperRef.current = swiper;
                          }}
                          slidesPerView={3}
                          spaceBetween={8}
                          watchSlidesProgress
                          className="mt-2"
                          breakpoints={{
                            320: { slidesPerView: 3 },
                            480: { slidesPerView: 4 },
                            768: { slidesPerView: 5 },
                          }}
                        >
                          {post.picture.map((pic, index) => (
                            <SwiperSlide key={index} className="cursor-pointer">
                              <div className="h-[60px] w-[80px] overflow-hidden rounded-md opacity-70 hover:opacity-100 transition-opacity duration-200 border-2 border-transparent hover:border-blue-500">
                                <Image
                                  src={pic}
                                  alt={`Thumbnail ${index + 1}`}
                                  className="w-full h-full object-cover rounded-md"
                                  preview={false}
                                />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      )} */}
                    </div>
                  )}
                </div>

                {/* Image counter for multiple images */}
                {post.picture.length > 1 && (
                  <div className="text-center text-gray-500 text-sm mt-2">
                    {post.picture.length} hình ảnh. Bấm nút chuyển để xem các hình ảnh khác nhau
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>

        {/* Comments Section - Full width on mobile */}
        <div className="w-full md:w-1/2 flex flex-col h-full border-t md:border-t-0 md:border-l">
          {/* Comments Section */}
          <div className="flex-1 flex flex-col p-4 overflow-hidden">
            <div
              ref={commentsContainerRef}
              className="flex-1 overflow-y-auto bg-gray-50 rounded-lg shadow-inner"
            >
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <Spin />
                </div>
              ) : (
                <List
                  dataSource={comments || []}
                  renderItem={(comment) => (
                    <List.Item className="border-b last:border-0 py-2">
                      <List.Item.Meta
                        avatar={<Avatar src={comment?.user_info?.picture} />}
                        title={
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-blue-700">
                              {comment?.user_info?.name || "Unknown User"}
                            </span>

                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">
                                {timeAgo(comment?.created_at)}
                              </span>

                              {/* Only show edit/delete dropdown for the current user's comments */}
                              {comment?.user_id === userInfo?.id && (
                                <Dropdown
                                  overlay={
                                    <Menu>
                                      <Menu.Item
                                        key="edit"
                                        icon={<EditOutlined />}
                                        onClick={() => handleStartEdit(comment)}
                                      >
                                        {t("update")}
                                      </Menu.Item>
                                      <Menu.Item
                                        key="delete"
                                        icon={<DeleteOutlined />}
                                        danger
                                        onClick={() =>
                                          handleDeleteComment(comment?.id)
                                        }
                                      >
                                        {t("delete")}
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
                          editingComment === comment?.id ? (
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
                                  {t("cancel")}
                                </Button>
                                <Button
                                  type="primary"
                                  size="small"
                                  onClick={handleSaveEdit}
                                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
                                >
                                  {t("update")}
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <p className="text-gray-700 bg-white p-2 rounded-md shadow-sm">
                                <ContentDisplay
                                  content={comment?.content || ""}
                                />
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

            {/* Comment Input Section */}
            <div className="mt-4 flex items-center gap-2 border-t pt-3 bg-white p-3 rounded-lg shadow-md">
              <div className="flex-grow relative rounded-lg overflow-hidden border border-gray-200 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-300 transition-all">
                <Input.TextArea
                  ref={commentInputRef}
                  placeholder={t("write comment")}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleAddComment();
                    }
                  }}
                  autoSize={{ minRows: 1, maxRows: 3 }}
                  disabled={isSubmitting}
                  className="border-0 focus:ring-0 focus:outline-none p-2 md:p-3 resize-none text-sm md:text-base"
                  style={{ boxShadow: "none" }}
                />
              </div>

              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleAddComment}
                loading={isSubmitting}
                disabled={!commentText.trim() || isSubmitting}
                className="h-full px-3 md:px-5 flex items-center justify-center rounded-lg shadow-md"
                style={{
                  background: commentText.trim() ? "#1890ff" : "#f0f0f0",
                  color: commentText.trim() ? "white" : "#bfbfbf",
                  transition: "all 0.3s",
                  alignSelf: "stretch",
                  minHeight: "40px",
                }}
              >
                <span className="hidden md:inline">{t("send")}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CommentModal;
