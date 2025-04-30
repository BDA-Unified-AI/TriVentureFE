import React, { useState, useEffect, useRef } from "react";
import { message, Modal } from "antd";
import { getComments, createComment } from "../../apis/comment";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import useAppState from "../Context/state";
import { Post, Comment } from "../Post/types";
import CommentPostCard from "./CommentPostCard";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";

interface CommentModalProps {
  post: Post;
  isModalOpen: boolean;
  closeModal: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  post,
  isModalOpen,
  closeModal,
}) => {
  const [comments, setComments] = useState<Comment[]>([] as Comment[]);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const userInfo = useAppState((state) => state.userInfo);
  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (commentsContainerRef.current) {
      const container = commentsContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  };
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

  return (
    <Modal
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
      width={1300}
      className="rounded-lg"
    >
      <div className="flex gap-6 p-4">
        <div className="w-1/2">
          <CommentPostCard
            post={post}
            thumbsSwiper={thumbsSwiper}
            setThumbsSwiper={setThumbsSwiper}
          />
        </div>
        <div className="w-1/2 border-l pl-4">
          <CommentList
            comments={comments}
            setComments={setComments}
            loading={loading}
            userInfo={userInfo}
            commentsContainerRef={commentsContainerRef}
            fetchComments={fetchComments}
            commentInputRef={commentsContainerRef}
            scrollToBottom={scrollToBottom}
          />
          <CommentInput
            commentInputRef={commentsContainerRef}
            commentText={commentText}
            setCommentText={setCommentText}
            handleAddComment={async () => {
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
              setTimeout(() => {
                if (commentsContainerRef.current) {
                  commentsContainerRef.current.scrollTop =
                    commentsContainerRef.current.scrollHeight;
                }
              }, 100);
              try {
                const response = await createComment({
                  post_id: post.id,
                  content: commentText,
                });
                if (response.status === 200 || response.status === 201) {
                  message.success("Bình luận đã được gửi!");
                  const commentId = response.data.message;
                  setComments((prevComments) =>
                    prevComments.map((comment) =>
                      comment.id === tempId
                        ? { ...comment, id: commentId }
                        : comment,
                    ),
                  );
                } else {
                  setComments((prevComments) =>
                    prevComments.filter((c) => c.id !== tempId),
                  );
                  message.error("Lỗi khi gửi bình luận.");
                }
              } catch (error) {
                setComments((prevComments) =>
                  prevComments.filter((c) => c.id !== tempId),
                );
                message.error("Đã xảy ra lỗi không xác định.");
              } finally {
                setIsSubmitting(false);
              }
            }}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CommentModal;
