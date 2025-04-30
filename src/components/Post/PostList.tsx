import React, { useState, useEffect, useCallback } from "react";
import { Button, Modal, message, Avatar } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Input, Form, Upload, Divider, Select } from "antd";
import { listAllDestinations } from "../../apis/dest";
import { createPost, listPosts, PostResponse } from "../../apis/post";
import PostCard from "./PostCard";
import { UploadChangeParam } from "antd/es/upload";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import useAppState from "../Context/state";
import PostSkeleton from "../../utils/PostSkeleton";
import { Post, DestinationItem } from "./types";
const { TextArea } = Input;

const PostList: React.FC = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [allDestinations, setAllDestinations] = useState<DestinationItem[]>([]);
  const [location, setLocation] = useState<string>("");
  const [form] = Form.useForm();
  const [imageBase64List, setImageBase64List] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isReloading, setIsReloading] = useState<boolean>(false);
  const userInfo = useAppState((state) => state.userInfo);

  const storedUserInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null;
  const loadPosts = async (page: number = 1, isLoadMore: boolean = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    try {
      const response = await listPosts(storedUserInfo?.id, page);
      const data = response.data as PostResponse;

      if (response.status === 200 && data.message && data.message.data) {
        const newPosts = data.message.data;
        if (isLoadMore) {
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        } else {
          setPosts(newPosts);
        }
        setHasMore(data.message.page < data.message.total_pages);
      } else {
        message.error("Lỗi khi tải bài viết. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error loading posts:", error);
      message.error("Không thể tải danh sách bài viết.");
    }
    if (isLoadMore) {
      setLoadingMore(false);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    loadPosts();
    const fetchAllDestinations = async () => {
      const allDestination = await listAllDestinations();
      setAllDestinations(allDestination);
    };
    fetchAllDestinations();
  }, []);

  const handleScroll = useCallback(() => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollThreshold = scrollHeight * 0.5; // 50% of the page height

    if (scrollPosition >= scrollThreshold && !loadingMore && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadPosts(nextPage, true);
    }
  }, [currentPage, loadingMore, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values: any) => {
    try {
      const postData = {
        content: values.content,
        destination_id: location,
        images_base64: imageBase64List, // Include base64 images in post data
      };

      const response = await createPost(postData);

      if (response.status === 201) {
        message.success("Post created successfully!");
        form.resetFields();
        setLocation("");
        setImageBase64List([]); // Reset image base64 list
        setIsModalVisible(false);
        loadPosts(); // Reload posts after creating a new one
      } else {
        message.error("Failed to create post. Please try again.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      message.error("An error occurred while creating the post.");
    }
  };
  function extractBase64(imageData: string) {
    const regex = /^data:image\/(png|jpeg|jpg|gif);base64,/;
    return imageData.replace(regex, "");
  }
  const handleImageUpload = async (info: UploadChangeParam) => {
    const files = info.fileList;
    const base64List: string[] = [];

    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj as any);

      reader.onload = () => {
        if (reader.result) {
          if (typeof reader.result === "string") {
            base64List.push(extractBase64(reader.result));
          }
          if (base64List.length === files.length) {
            setImageBase64List(base64List);
          }
        }
      };
    }
  };

  const handlePostDelete = (postId: string) => {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId)
    );
  };

  return (
    <div className="bg-gray-100">
      <div className="px-6 py-8 md:px-8 md:py-12 text-center rounded-b-xl bg-gray-100 ">
        {userInfo && userInfo.picture && (
          <div className="flex justify-center items-center">
            <div
              className="flex items-center justify-center mt-4 p-4 bg-white rounded-full shadow-md cursor-pointer border-solid border-2 hover:bg-gray-100 transition duration-200 ease-in-out"
              onClick={showModal}
            >
              <Avatar src={userInfo.picture} size="large" />
              <p className="ml-2 text-gray-500 font-roboto">
                {userInfo.name}, {t("What's on your mind?")}
              </p>
            </div>
          </div>
        )}
      </div>
      {loading && <PostSkeleton count={2} />}
      {Array.isArray(posts) && posts.length > 0 ? (
        <div className="container mx-auto p-5 flex flex-col items-center">
          <AnimatePresence mode="popLayout">
            {posts.length > 0 &&
              posts.map(
                (post) =>
                  post && (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        y: -50,
                        transition: {
                          duration: 0.2,
                          ease: "easeOut",
                        },
                      }}
                      layout
                      className="w-full"
                    >
                      <PostCard post={post} onPostDelete={handlePostDelete} />
                    </motion.div>
                  )
              )}
          </AnimatePresence>
          {loadingMore && <PostSkeleton count={1} />}
          {!hasMore && posts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-2 mt-4"
            >
              <span className="text-gray-500 text-sm">
                {t("No more posts")}
              </span>
              <Button
                type="primary"
                ghost
                loading={isReloading}
                onClick={async () => {
                  setIsReloading(true);
                  setCurrentPage(1);
                  setHasMore(true);
                  await loadPosts(1);
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                  setIsReloading(false);
                }}
                className="flex items-center gap-2"
                icon={<ReloadOutlined />}
              >
                {t("Reload Page")}
              </Button>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="p-5 flex flex-col items-center">
          <p>{t("No posts available")}</p>
        </div>
      )}

      <Modal
        title={t("Create post")}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={<strong>{t("destination")}</strong>}
            name="destination"
            initialValue={allDestinations[0]}
            rules={[
              { required: true, message: t("Please choose destination") },
            ]}
          >
            <Select
              size="large"
              value={location}
              onChange={(value) => setLocation(value)}
              className="w-full"
              placeholder={t("select destination")}
            >
              {allDestinations.map((dest, index) => (
                <Select.Option key={index} value={dest.id}>
                  {dest.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={<strong>{t("Content")}</strong>}
            name="content"
            rules={[{ required: true, message: "Nhập nội dung bài viết" }]}
          >
            <TextArea
              rows={4}
              placeholder={t("What's on your mind?")}
              className="rounded-lg  "
            />
          </Form.Item>

          <Form.Item
            label={<strong>{t("Image")}</strong>}
            name="images"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload
              listType="picture-card"
              beforeUpload={() => {
                return false;
              }}
              onChange={handleImageUpload}
              multiple
              accept="image/*"
              className="rounded-lg"
            >
              <div>
                <PlusOutlined />
                <div className="mt-2">{t("Upload image")}</div>
              </div>
            </Upload>
          </Form.Item>

          <Divider />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="rounded-lg"
            >
              {t("Create post")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PostList;
