import React, { useState } from 'react';
import { Modal, Input, Button, Avatar, Space, Divider, Typography } from 'antd';
import { SendOutlined, SmileOutlined, PictureOutlined, LoadingOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import EmojiPicker from 'emoji-picker-react';

const { TextArea } = Input;
const { Text } = Typography;

interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (content: string, attachments?: File[]) => Promise<void>;
  loading?: boolean;
  userAvatar?: string;
  username?: string;
}

const CommentModal: React.FC<CommentModalProps> = ({
  visible,
  onClose,
  onSubmit,
  loading = false,
  userAvatar,
  username = 'Anonymous',
}) => {
  const { t } = useTranslation();
  const [comment, setComment] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleSubmit = async () => {
    if (comment.trim() || attachments.length > 0) {
      await onSubmit(comment, attachments);
      setComment('');
      setAttachments([]);
      setPreviewUrls([]);
      setShowEmoji(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newAttachments = [...attachments, ...files];
    setAttachments(newAttachments);

    // Generate preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
  };

  const removeAttachment = (index: number) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    setAttachments(newAttachments);
    setPreviewUrls(newPreviewUrls);
  };

  const onEmojiClick = (emojiObject: any) => {
    setComment(prev => prev + emojiObject.emoji);
    setShowEmoji(false);
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={500}
      className="comment-modal"
      title={
        <div className="flex items-center gap-2 p-2">
          <Avatar 
            src={userAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} 
            size={40}
            className="flex-shrink-0"
          />
          <Text strong className="text-lg">{username}</Text>
        </div>
      }
      bodyStyle={{ padding: '20px' }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col min-h-[300px]"
      >
        <div className="flex-grow mb-4">
          <TextArea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t('Write your comment...')}
            autoSize={{ minRows: 3, maxRows: 6 }}
            className="rounded-lg border-2 focus:border-blue-400 transition-colors w-full text-base p-3"
          />
        </div>

        <AnimatePresence>
          {showEmoji && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute z-10 bottom-20 left-0"
            >
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </motion.div>
          )}
        </AnimatePresence>

        {previewUrls.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-4">
            {previewUrls.map((url, index) => (
              <motion.div
                key={url}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-square"
              >
                <img
                  src={url}
                  alt="attachment"
                  className="w-full h-full object-cover rounded-lg shadow-sm"
                />
                <Button
                  type="text"
                  danger
                  size="small"
                  className="absolute top-1 right-1 w-6 h-6 p-0 flex items-center justify-center bg-white/80 hover:bg-white"
                  onClick={() => removeAttachment(index)}
                >
                  ×
                </Button>
              </motion.div>
            ))}
          </div>
        )}

        <Divider className="my-3" />

        <div className="flex justify-between items-center h-12">
          <Space size="middle" className="h-full">
            <Button
              icon={<SmileOutlined className="text-xl" />}
              type="text"
              onClick={() => setShowEmoji(!showEmoji)}
              className="hover:text-blue-500 transition-colors h-full flex items-center"
            />
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="h-full">
              <Button
                icon={<PictureOutlined className="text-xl" />}
                type="text"
                className="hover:text-blue-500 transition-colors h-full flex items-center"
              />
            </label>
          </Space>

          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={!comment.trim() && attachments.length === 0}
            icon={loading ? <LoadingOutlined /> : <SendOutlined />}
            className="bg-blue-500 hover:bg-blue-600 h-full px-6 flex items-center"
            size="large"
          >
            {t('Send')}
          </Button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default CommentModal; 