import React, { useState, useEffect } from "react";
import {
  Card,
  Avatar,
  Button,
  Dropdown,
  Tooltip,
  Modal,
  Input,
  message,
  Menu,
} from "antd";
import {
  LikeOutlined,
  MessageOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { interactReaction } from "../../apis/reaction";
import { timeAgo } from "../../utils/timeAgo";
import CommentModal from "./CommentModal";
import { Post } from "./types";
import { updatePost, deletePost } from "../../apis/post";
import useAppState from "../../components/Context/state";
import { NavLink } from "react-router-dom";
import ContentDisplay from "../../utils/ContentDisplay";
import reactions from "../../utils/reactions";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface PostCardProps {
  post: Post;
  onPostDelete?: (postId: string) => void;
}

const { TextArea } = Input;

const PostCard: React.FC<PostCardProps> = ({ post, onPostDelete }) => {
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [selectedReaction, setSelectedReaction] = useState<number | null>(
    post.current_user_reaction?.reaction_type || null
  );
  const [reactionId, setReactionId] = useState<string | null>(
    post.current_user_reaction?.id || null
  );
  const [reactionCount, setReactionCount] = useState<number>(
    post.reaction_count || 0
  );
  const [showReactions, setShowReactions] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedContent, setUpdatedContent] = useState<string>(post.content);
  const [content, setContent] = useState<string>(post.content);
  const userInfo = useAppState((state) => state.userInfo);
  const [isUpdating, setIsUpdating] = useState(false);
  const [commentCount, setCommentCount] = useState<number>(
    post.comment_count || 0
  );
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  useEffect(() => {
    // Initialize with empty array to not show any images initially
    setLoadedImages([]);

    // Set up intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && post.picture && post.picture.length > 0) {
            setLoadedImages(post.picture);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe the card element
    const cardElement = document.getElementById(`post-card-${post.id}`);
    if (cardElement) {
      observer.observe(cardElement);
    }

    return () => {
      observer.disconnect();
    };
  }, [post.id, post.picture]);

  const handleReaction = async (type: number) => {
    if (!reactionId) {
      setSelectedReaction(type);
      setReactionCount((prev) => prev + 1);
      setShowReactions(false);

      const response = await interactReaction(0, post.id, null, type);
      if (response.status !== 201) {
        setSelectedReaction(null);
        setReactionCount((prev) => Math.max(prev - 1, 0));
        return;
      }
      setReactionId(response.data.reaction_id || null);
    } else if (reactionId && type === selectedReaction) {
      setSelectedReaction(null);
      setReactionCount((prev) => Math.max(prev - 1, 0));
      setShowReactions(false);

      const response = await interactReaction(
        selectedReaction,
        post.id,
        reactionId,
        type
      );
      if (response.status !== 200) {
        setSelectedReaction(type);
        setReactionCount((prev) => prev + 1);
      }
      setReactionId(null);
    } else if (reactionId && type !== selectedReaction) {
      const previousReaction = selectedReaction;
      setSelectedReaction(type);
      setShowReactions(false);

      const response = await interactReaction(
        previousReaction ?? 0,
        post.id,
        reactionId,
        type
      );
      if (response.status !== 200) {
        setSelectedReaction(previousReaction);
      }
    }
  };

  const handleUpdatePost = async () => {
    const previousContent = content;
    try {
      setIsUpdating(true);
      setContent(updatedContent);
      setIsEditModalOpen(false);

      const response = await updatePost({
        content: updatedContent,
        post_id: post.id,
      });

      if (response.status === 200) {
        message.success("Post updated successfully!");
      } else {
        setContent(previousContent);
        message.error("Failed to update post.");
      }
    } catch (error) {
      setContent(previousContent);
      message.error("An error occurred while updating the post.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeletePost = async () => {
    Modal.confirm({
      title: (
        <div className="flex items-center space-x-3">
          <DeleteOutlined className="text-red-500 text-xl" />
          <span className="text-xl font-medium text-gray-800">
            {t("Delete Post")}
          </span>
        </div>
      ),
      content: (
        <div className="mt-1 space-y-2">
          <p className="text-gray-600">
            {t("Are you sure you want to delete this post?")}
          </p>
          <p className="text-sm text-gray-500">
            {t("This action cannot be undone.")}
          </p>
        </div>
      ),
      okText: t("delete"),
      cancelText: t("cancel"),
      okButtonProps: {
        className: "text-white",
      },
      cancelButtonProps: {
        className: "hover:bg-gray-50 border-gray-300 text-gray-600",
      },
      className: "rounded-xl overflow-hidden",
      centered: true,
      maskClosable: true,
      onOk: async () => {
        try {
          onPostDelete?.(post.id);

          const response = await deletePost(post.id);

          if (response.status === 200) {
            message.success(t("Post deleted successfully!"));
          } else {
            message.error(t("Failed to delete post."));
          }
        } catch (error) {
          message.error(t("An error occurred while deleting the post."));
        }
      },
    });
  };

  return (
    <>
      <Card
        id={`post-card-${post.id}`}
        className="w-full max-w-2xl mx-auto rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white mb-5 overflow-hidden border border-gray-100"
        bodyStyle={{ padding: "24px" }}
      >
        {/* Header Section */}
        <div className="flex items-start justify-between mb-5">
          {/* User info section */}
          <div className="flex items-start space-x-3 flex-1">
            <Avatar
              src={post.user_info.picture}
              size={40}
              className="ring-2 ring-blue-50 hover:ring-blue-100 transition-all flex-shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-gray-900 text-[15px] hover:underline cursor-pointer truncate">
                {post.user_info.name}
              </span>
              <div className="flex items-center text-sm text-gray-500 space-x-2 mt-0.5">
                <NavLink
                  to={`/destination/${post.destination_id}`}
                  className="text-blue-600 hover:text-blue-700 hover:underline flex items-center font-medium truncate"
                >
                  <EnvironmentOutlined className="mr-1 flex-shrink-0" />
                  <span className="truncate">{post.destination_name}</span>
                </NavLink>
                <span className="flex-shrink-0">•</span>
                <span className="text-gray-500 hover:underline cursor-pointer flex-shrink-0">
                  {timeAgo(post.created_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Three dots menu - Adjusted for mobile */}
          {post.user_info.user_id === userInfo?.id && (
            <Dropdown
              overlay={
                <Menu className="rounded-lg shadow-lg border border-gray-100">
                  <Menu.Item
                    key="edit"
                    icon={<EditOutlined className="text-blue-500" />}
                    onClick={() => setIsEditModalOpen(true)}
                    className="px-4 py-2.5"
                  >
                    {t("update")}
                  </Menu.Item>
                  <Menu.Item
                    key="delete"
                    icon={<DeleteOutlined className="text-red-500" />}
                    danger
                    onClick={handleDeletePost}
                    className="px-4 py-2.5"
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
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full h-8 w-8 flex items-center justify-center -mt-1 flex-shrink-0"
              />
            </Dropdown>
          )}
        </div>

        {/* Content Section */}
        <div className="my-4 text-gray-700 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={content}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              <ContentDisplay content={content} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Images Section */}
        {post.picture && post.picture.length > 0 && (
          <div className="my-4">
            {post.picture && post.picture.length > 0 && (
              <div className="my-4">
                <div className="w-full grid gap-1">
                  {(() => {
                    const total = post.picture.length;
                    const images = loadedImages.length > 0 ? loadedImages : [];

                    const handleClick = (index: number) => {
                      setLightboxIndex(index);
                      setLightboxOpen(true);
                    };

                    if (total === 1) {
                      return (
                        <div className="w-full">
                          <img
                            src={images[0]}
                            alt=""
                            className="w-full h-auto max-h-[500px] object-cover rounded-md cursor-pointer"
                            onClick={() => handleClick(0)}
                          />
                        </div>
                      );
                    }

                    if (total === 2) {
                      return (
                        <div className="grid grid-cols-2 gap-1">
                          {images.map((src, i) => (
                            <img
                              key={i}
                              src={src}
                              alt=""
                              className="w-full h-72 object-cover rounded-md cursor-pointer"
                              onClick={() => handleClick(i)}
                            />
                          ))}
                        </div>
                      );
                    }

                    if (total === 3) {
                      return (
                        <div className="grid grid-cols-4 gap-1 h-70">
                          <div className="col-span-2 h-full">
                            <img
                              src={images[0]}
                              alt=""
                              className="w-full h-full object-cover rounded-md cursor-pointer"
                              onClick={() => handleClick(0)}
                            />
                          </div>
                          <div className="col-span-2 grid grid-rows-2 gap-1">
                            <img
                              src={images[1]}
                              alt=""
                              className="w-full h-full object-cover rounded-md cursor-pointer"
                              onClick={() => handleClick(1)}
                            />
                            <img
                              src={images[2]}
                              alt=""
                              className="w-full h-full object-cover rounded-md cursor-pointer"
                              onClick={() => handleClick(2)}
                            />
                          </div>
                        </div>
                      );
                    }

                    if (total === 4) {
                      return (
                        <div className="grid grid-cols-2 gap-1">
                          {images.slice(0, 4).map((src, i) => (
                            <img
                              key={i}
                              src={src}
                              alt=""
                              className="w-full h-60 object-cover rounded-md cursor-pointer"
                              onClick={() => handleClick(i)}
                            />
                          ))}
                        </div>
                      );
                    }

                    if (total >= 5) {
                      return (
                        <div className="grid grid-cols-2 gap-1">
                          {images.slice(0, 4).map((src, i) => (
                            <div key={i} className="relative">
                              <img
                                src={src}
                                alt=""
                                className="w-full h-60 object-cover rounded-md cursor-pointer"
                                onClick={() => handleClick(i)}
                              />
                              {i === 3 && (
                                <div
                                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md cursor-pointer"
                                  onClick={() => handleClick(3)}
                                >
                                  <span className="text-white text-xl font-semibold">
                                    +{total - 4}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      );
                    }

                    return null;
                  })()}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Image Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={loadedImages.map((src) => ({ src }))}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
            root: { "--yarl__color_backdrop": "rgba(0, 0, 0, 0.9)" },
          }}
        />

        {/* Moved Reactions and Comments Count outside of Images section */}
        <div className="flex justify-between items-center my-4 px-1 text-sm">
          <div className="flex items-center space-x-1.5">
            {reactionCount > 0 ? (
              <>
                <div className="flex -space-x-1">
                  {Array.from(new Set(post.reactions?.map((r) => r.type) || []))
                    .slice(0, 3)
                    .map((type) => (
                      <div
                        key={type}
                        className="w-5 h-5 rounded-full bg-white shadow-sm ring-2 ring-white"
                      >
                        <span className="text-sm">
                          {reactions.find((r) => r.type === type)?.icon}
                        </span>
                      </div>
                    ))}
                </div>
                <span className="text-gray-500 hover:underline cursor-pointer">
                  {reactionCount} {t("reactions")}
                </span>
              </>
            ) : (
              <span className="text-gray-400">0 {t("reactions")}</span>
            )}
          </div>

          <Button
            type="text"
            onClick={(e) => {
              e.stopPropagation();
              setIsCommentModalOpen(true);
            }}
            className="text-gray-500 hover:underline cursor-pointe"
          >
            <span className="font-medium text-sm md:text-base"></span>
            {commentCount} {t("comments")}
          </Button>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-gray-100 my-3"></div>

        {/* Actions Section */}
        <div className="flex items-center justify-between pt-1">
          <Dropdown
            overlay={
              <div
                className="bg-white p-2 rounded-xl shadow-lg flex space-x-1 border border-gray-100"
                onMouseLeave={() => setShowReactions(false)}
              >
                {reactions.map((reaction) => (
                  <motion.div
                    key={reaction.type}
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Tooltip title={reaction.label} placement="top">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReaction(reaction.type);
                        }}
                        className={`p-3 rounded-full transition-all ${
                          selectedReaction === reaction.type
                            ? `${reaction.color} ${reaction.hoverColor} scale-110 shadow-sm`
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-2xl transform hover:scale-110 transition-transform">
                          {reaction.icon}
                        </span>
                      </button>
                    </Tooltip>
                  </motion.div>
                ))}
              </div>
            }
            trigger={["hover"]}
            open={showReactions}
            onOpenChange={setShowReactions}
            placement="topCenter"
          >
            <Button
              type="text"
              className={`flex-1 flex items-center justify-center space-x-1 hover:bg-gray-50 rounded-lg px-2 md:px-6 py-2.5 transition-all ${
                selectedReaction
                  ? reactions.find((r) => r.type === selectedReaction)?.color
                  : "text-gray-600"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-xl">
                {selectedReaction ? (
                  <motion.span
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    {reactions.find((r) => r.type === selectedReaction)?.icon}
                  </motion.span>
                ) : (
                  <LikeOutlined />
                )}
              </span>
              <span className="font-medium text-sm md:text-base">
                {selectedReaction
                  ? reactions.find((r) => r.type === selectedReaction)?.label
                  : t("Like")}
              </span>
            </Button>
          </Dropdown>

          <div className="w-px h-6 bg-gray-200 mx-1"></div>

          <Button
            type="text"
            icon={<MessageOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setIsCommentModalOpen(true);
            }}
            className="flex-1 flex items-center justify-center space-x-1 hover:bg-gray-50 rounded-lg px-2 md:px-6 py-2.5 transition-all text-gray-600"
          >
            <span className="font-medium text-sm md:text-base">
              {t("Comment")}
            </span>
          </Button>
        </div>
      </Card>

      {/* Update Modal */}
      <Modal
        title={
          <div className="flex items-center space-x-2 px-2 py-1">
            <EditOutlined className="text-blue-500" />
            <span className="font-medium text-gray-800">
              {t("Update Post")}
            </span>
          </div>
        }
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setUpdatedContent(content);
        }}
        onOk={handleUpdatePost}
        okText={t("Save")}
        cancelText={t("Cancel")}
        confirmLoading={isUpdating}
        className="rounded-lg"
        okButtonProps={{
          className:
            "bg-blue-500 hover:bg-blue-600 rounded-lg px-5 py-2.5 h-auto",
        }}
        cancelButtonProps={{
          className: "rounded-lg px-5 py-2.5 h-auto",
        }}
      >
        <TextArea
          rows={4}
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
          className="rounded-lg resize-none mt-4 p-3"
          placeholder={t("What's on your mind?")}
          disabled={isUpdating}
        />
      </Modal>

      <CommentModal
        post={post}
        isModalOpen={isCommentModalOpen}
        closeModal={() => setIsCommentModalOpen(false)}
        onCommentAdded={() => setCommentCount((prev) => prev + 1)}
        onCommentDeleted={() =>
          setCommentCount((prev) => Math.max(prev - 1, 0))
        }
      />
    </>
  );
};

export default PostCard;
