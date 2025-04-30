import React, { useState } from "react";
import { Avatar, Input, Button, Tooltip } from "antd";
import { Comment as AntComment } from "@ant-design/compatible";
import { SendOutlined, LikeOutlined, LikeFilled } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface CommentProps {
  avatar?: string;
  author: string;
  content: string;
  datetime: string;
  likes?: number;
  isLiked?: boolean;
  onLike?: () => void;
  onReply?: (content: string) => void;
  replies?: Array<{
    author: string;
    avatar?: string;
    content: string;
    datetime: string;
  }>;
}

const Comment: React.FC<CommentProps> = ({
  avatar,
  author,
  content,
  datetime,
  likes = 0,
  isLiked = false,
  onLike,
  onReply,
  replies = [],
}) => {
  const { t } = useTranslation();
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showReplies, setShowReplies] = useState(false);

  const handleReply = () => {
    if (replyContent.trim() && onReply) {
      onReply(replyContent);
      setReplyContent("");
      setIsReplying(false);
    }
  };

  const commentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const replyVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
  };

  const actions = [
    <Tooltip key="like" title={isLiked ? t("Unlike") : t("Like")}>
      <motion.span
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onLike}
        className="flex items-center gap-1 cursor-pointer"
      >
        {isLiked ? <LikeFilled className="text-blue-500" /> : <LikeOutlined />}
        <span className="text-sm text-gray-500">{likes}</span>
      </motion.span>
    </Tooltip>,
    <span
      key="reply"
      className="cursor-pointer text-gray-500 hover:text-blue-500 transition-colors"
      onClick={() => setIsReplying(!isReplying)}
    >
      {t("Reply")}
    </span>,
    replies.length > 0 && (
      <span
        key="show-replies"
        className="cursor-pointer text-gray-500 hover:text-blue-500 transition-colors"
        onClick={() => setShowReplies(!showReplies)}
      >
        {showReplies
          ? t("Hide Replies")
          : t(`Show Replies (${replies.length})`)}
      </span>
    ),
  ].filter(Boolean);

  return (
    <motion.div
      variants={commentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
    >
      <AntComment
        author={<span className="font-semibold text-gray-800">{author}</span>}
        avatar={
          <Avatar
            src={
              avatar ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`
            }
            alt={author}
            className="border-2 border-blue-100"
          />
        }
        content={<div className="text-gray-700 mt-2">{content}</div>}
        datetime={
          <Tooltip title={dayjs(datetime).format("YYYY-MM-DD HH:mm:ss")}>
            <span className="text-gray-400 text-sm">
              {dayjs(datetime).fromNow()}
            </span>
          </Tooltip>
        }
        actions={actions}
      />

      <AnimatePresence>
        {isReplying && (
          <motion.div
            variants={replyVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="mt-4 ml-12"
          >
            <div className="flex gap-2">
              <Input.TextArea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder={t("Write your reply...")}
                autoSize={{ minRows: 1, maxRows: 4 }}
                className="rounded-lg"
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleReply}
                disabled={!replyContent.trim()}
                className="flex items-center"
              >
                {t("Send")}
              </Button>
            </div>
          </motion.div>
        )}

        {showReplies && replies.length > 0 && (
          <motion.div
            variants={replyVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="mt-4 ml-12 space-y-4"
          >
            {replies.map((reply, index) => (
              <motion.div
                key={index}
                variants={commentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-gray-50 rounded-lg p-3"
              >
                <AntComment
                  author={
                    <span className="font-semibold text-gray-800">
                      {reply.author}
                    </span>
                  }
                  avatar={
                    <Avatar
                      src={
                        reply.avatar ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${reply.author}`
                      }
                      alt={reply.author}
                      className="border-2 border-blue-100"
                    />
                  }
                  content={
                    <div className="text-gray-700 mt-2">{reply.content}</div>
                  }
                  datetime={
                    <Tooltip
                      title={dayjs(reply.datetime).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    >
                      <span className="text-gray-400 text-sm">
                        {dayjs(reply.datetime).fromNow()}
                      </span>
                    </Tooltip>
                  }
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Comment;
