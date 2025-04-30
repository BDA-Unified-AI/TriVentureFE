import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  message,
  Popconfirm,
  Space,
  Image,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  EnvironmentOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { postApi } from "../../apis/postApi";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import CommentModal from "../../components/Post/CommentModal";
import { Post } from "../../components/Post/types";

interface PaginationResponse {
  data: Post[];
  page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
}

interface ApiResponse {
  status: string;
  message: PaginationResponse;
}

const PostManagement: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const fetchPosts = async (page: number = 1, pageSize: number = 5) => {
    try {
      setLoading(true);
      const response: ApiResponse = await postApi.getAllPosts(page, pageSize);
      if (response.status === "success") {
        setPosts(response.message.data);
        setPagination({
          current: response.message.page,
          pageSize: response.message.page_size,
          total: response.message.total_items,
        });
      } else {
        message.error(t("Failed to fetch posts"));
      }
    } catch (error) {
      message.error(t("Failed to fetch posts"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId: string) => {
    try {
      await postApi.deletePost(postId);
      message.success(t("Post deleted successfully"));
      fetchPosts(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error(t("Failed to delete post"));
    }
  };

  const handleTableChange = (pagination: any) => {
    fetchPosts(pagination.current, pagination.pageSize);
    // Scroll to the top of the posts table
    document
      .getElementById("posts-table-top")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewComments = (post: Post) => {
    setSelectedPost(post);
    setIsCommentModalVisible(true);
  };

  // Mobile-optimized columns
  const mobileColumns = [
    {
      title: t("Post Details"),
      key: "details",
      render: (record: Post) => (
        <div className="flex flex-col space-y-2">
          {/* Author info */}
          <div className="flex items-center space-x-2 text-sm">
            <img
              src={record.user_info.picture}
              alt={record.user_info.name}
              className="w-6 h-6 rounded-full"
            />
            <span>{record.user_info.name}</span>
          </div>

          {/* Destination */}
          <div className="flex items-center space-x-1 text-sm">
            <EnvironmentOutlined className="text-blue-500" />
            <span>{record.destination_name}</span>
          </div>
          <Typography.Paragraph
            ellipsis={{ rows: 2 }}
            className="font-medium mb-1"
          >
            {record.content}
          </Typography.Paragraph>
          {/* Post images */}
          {record.picture && record.picture.length > 0 && (
            <div className="mt-2">
              <Image.PreviewGroup>
                <div className="flex flex-wrap gap-1">
                  {record.picture.slice(0, 3).map((image, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={image}
                        alt={`Post image ${index + 1}`}
                        width={70}
                        height={70}
                        className="rounded-md object-cover shadow-sm"
                        style={{ objectFit: "cover" }}
                        preview={{
                          mask: (
                            <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-40 rounded-md">
                              <div className="text-white text-xs">
                                {t("View")}
                              </div>
                            </div>
                          ),
                        }}
                      />
                    </div>
                  ))}
                  {record.picture.length > 3 && (
                    <div className="flex items-center justify-center rounded-md bg-gray-100 w-[70px] h-[70px] text-gray-600">
                      +{record.picture.length - 3}
                    </div>
                  )}
                </div>
              </Image.PreviewGroup>
            </div>
          )}

          {/* Stats */}
          <div className="flex space-x-4 text-xs text-gray-600 mt-1">
            <span>
              {t("Reactions")}: {record.reaction_count}
            </span>
            <span>
              {t("Comments")}: {record.comment_count}
            </span>
            <span className="text-gray-400">
              {new Date(record.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: t("Actions"),
      key: "actions",
      render: (_: any, record: Post) => (
        <Space direction="vertical" size="small">
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewComments(record)}
          >
            {t("View")}
          </Button>
          <Popconfirm
            title={t("Delete this post?")}
            onConfirm={() => handleDelete(record.id)}
            okText={t("Yes")}
            cancelText={t("No")}
          >
            <Button danger size="small" icon={<DeleteOutlined />}>
              {t("Delete")}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Desktop columns
  const desktopColumns = [
    {
      title: t("Content"),
      dataIndex: "content",
      key: "content",
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: t("Author"),
      dataIndex: "user_info",
      key: "author",
      render: (user: any) => (
        <div className="flex items-center space-x-2">
          <img
            src={user.picture}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
          <span>{user.name}</span>
        </div>
      ),
    },
    {
      title: t("Destination"),
      dataIndex: "destination_name",
      key: "destination",
      render: (name: string) => (
        <div className="flex items-center space-x-1">
          <EnvironmentOutlined className="text-blue-500" />
          <span>{name}</span>
        </div>
      ),
    },
    {
      title: t("Images"),
      dataIndex: "picture",
      key: "images",
      render: (images: string[]) => (
        <Image.PreviewGroup>
          <div className="flex flex-wrap gap-1">
            {images && images.length > 0 ? (
              images.slice(0, 3).map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Post image ${index + 1}`}
                  width={50}
                  height={50}
                  className="rounded-md object-cover shadow-sm"
                  preview={{
                    mask: (
                      <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-40 rounded-md">
                        <div className="text-white text-xs">{t("View")}</div>
                      </div>
                    ),
                  }}
                />
              ))
            ) : (
              <span className="text-gray-400">{t("No images")}</span>
            )}
            {images && images.length > 3 && (
              <div className="flex items-center justify-center rounded-md bg-gray-100 w-[50px] h-[50px] text-gray-600 text-xs">
                +{images.length - 3}
              </div>
            )}
          </div>
        </Image.PreviewGroup>
      ),
    },
    {
      title: t("Stats"),
      key: "stats",
      render: (record: Post) => (
        <div className="flex space-x-4">
          <span className="text-gray-600">
            {t("Reactions")}: {record.reaction_count}
          </span>
          <span className="text-gray-600">
            {t("Comments")}: {record.comment_count}
          </span>
        </div>
      ),
    },
    {
      title: t("Created At"),
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: t("Actions"),
      key: "actions",
      render: (_: any, record: Post) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleViewComments(record)}
          >
            {t("View")}
          </Button>
          <Popconfirm
            title={t("Are you sure you want to delete this post?")}
            onConfirm={() => handleDelete(record.id)}
            okText={t("Yes")}
            cancelText={t("No")}
          >
            <Button danger icon={<DeleteOutlined />}>
              {t("Delete")}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${isMobile ? "p-3" : "p-6"}`}
    >
      <div className={`${isMobile ? "mb-4" : "mb-6"}`}>
        <h1
          className={`${
            isMobile ? "text-xl" : "text-2xl"
          } font-bold text-gray-800`}
        >
          {t("Post Management")}
        </h1>
        <p className="text-gray-600 mt-2">
          {t("Manage and moderate posts on the platform")}
        </p>
      </div>

      <div id="posts-table-top">
        <Table
          columns={isMobile ? mobileColumns : desktopColumns}
          dataSource={posts}
          rowKey="id"
          loading={loading}
          className="bg-white rounded-lg shadow-sm"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: !isMobile,
            showQuickJumper: !isMobile,
            size: isMobile ? "small" : "default",
            showTotal: (total) =>
              isMobile
                ? `${total} ${t("items")}`
                : `${t("Total")} ${total} ${t("items")}`,
            className: "flex justify-center",
            position: ["bottomCenter"],
          }}
          onChange={handleTableChange}
          size={isMobile ? "small" : "middle"}
          scroll={isMobile ? { x: "100%" } : undefined}
        />
      </div>

      {selectedPost && (
        <CommentModal
          post={selectedPost}
          isModalOpen={isCommentModalVisible}
          closeModal={() => setIsCommentModalVisible(false)}
          onCommentAdded={() => {}}
          onCommentDeleted={() => {}}
        />
      )}
    </motion.div>
  );
};

export default PostManagement;
