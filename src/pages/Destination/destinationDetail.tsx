import { useEffect, useState, useRef, useCallback } from "react";
import {
  Modal,
  Form,
  Select,
  Input,
  Upload,
  Button,
  Divider,
  message,
  Avatar,
} from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import { motion, AnimatePresence } from "framer-motion";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getDestinationDetail } from "../../apis/dest";
import { createPost } from "../../apis/post";
import { listPostsByDestination } from "../../apis/post";
import PostCard from "../../components/Post/PostCard";
import { Post } from "../../components/Post/types";
import useAppState from "../../components/Context/state";
import PostSkeleton from "../../utils/PostSkeleton";
import "./style.scss";

const { TextArea } = Input;
interface DestinationDetail {
  id: string;
  name: string;
  description: string;
  image: string;
}

const DestinationDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<DestinationDetail | null>(
    null
  );
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [imageBase64List, setImageBase64List] = useState<string[]>([]);
  const userInfo = useAppState((state) => state.userInfo);
  const storedUserInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null;
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const observerTarget = useRef(null);

  const loadMorePosts = useCallback(async () => {
    if (!id || loadingMore || !hasMore) {
      return;
    }

    try {
      setLoadingMore(true);
      const nextPage = currentPage + 1;

      const postRes = await listPostsByDestination(
        id,
        storedUserInfo?.id,
        nextPage
      );

      if (postRes.status === 200 && postRes.data.status === "success") {
        const newPosts = postRes.data.message.data;
        const totalPagesFromResponse = postRes.data.message.total_pages;

        if (newPosts.length > 0) {
          setPosts((prev) => [...prev, ...newPosts]);
          setCurrentPage(nextPage);
          setHasMore(nextPage < totalPagesFromResponse);
        } else {
          setHasMore(false);
        }
      }
    } catch (err) {
      console.error("Error loading more posts:", err);
      message.error(t("Error loading more posts"));
    } finally {
      setLoadingMore(false);
    }
  }, [id, currentPage, loadingMore, hasMore, storedUserInfo?.id, t]);

  useEffect(() => {
    let observer: IntersectionObserver;

    // Only set up the observer if we have posts and there's more to load
    if (posts.length > 0 && hasMore && !loading) {
      observer = new IntersectionObserver(
        (entries) => {
          const firstEntry = entries[0];

          if (firstEntry.isIntersecting && !loadingMore && hasMore) {
            loadMorePosts();
          }
        },
        { threshold: 0.1, rootMargin: "100px" }
      );

      const currentTarget = observerTarget.current;

      if (currentTarget) {
        observer.observe(currentTarget);
      }
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [loadMorePosts, loadingMore, hasMore, posts.length, loading]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentPage(1);
    setPosts([]);
    setHasMore(true);
    setLoadingMore(false);

    const fetchInitialData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const dest = await getDestinationDetail(id);
        const postRes = await listPostsByDestination(id, storedUserInfo?.id, 1);
        setDestination(dest);
        if (postRes.status === 200 && postRes.data.status === "success") {
          setPosts(postRes.data.message.data);
          const totalPagesFromResponse = postRes.data.message.total_pages;
          setHasMore(1 < totalPagesFromResponse);
        }
      } catch (err) {
        console.error("Error fetching destination detail:", err);
        message.error(t("Error loading destination details"));
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [id]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values: any) => {
    try {
      if (!id) {
        message.error("Destination ID is missing.");
        return;
      }

      const postData = {
        content: values.content,
        destination_id: id,
        images_base64: imageBase64List,
      };

      const response = await createPost(postData);

      if (response.status === 201) {
        message.success("Post created successfully!");
        form.resetFields();
        setImageBase64List([]);
        setIsModalVisible(false);
        loadPosts();
      } else {
        message.error("Failed to create post. Please try again.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      message.error("An error occurred while creating the post.");
    }
  };

  const loadPosts = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await listPostsByDestination(id, storedUserInfo?.id, 1);
      if (response.status === 200 && response.data.status === "success") {
        setPosts(response.data.message.data);
        setCurrentPage(1);
        const totalPagesFromResponse = response.data.message.total_pages;
        setHasMore(1 < totalPagesFromResponse);
      } else {
        message.error(t("Error loading posts. Please try again!"));
      }
    } catch (error) {
      console.error("Error loading posts:", error);
      message.error(t("Could not load posts."));
    }
    setLoading(false);
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

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="relative">
          <div className="w-full h-[640px] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer rounded-b-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent rounded-b-3xl"></div>
          <div className="absolute bottom-8 left-8">
            <div className="h-12 w-64 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer rounded-lg mb-4"></div>
            <div className="h-6 w-96 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer rounded-lg"></div>
          </div>
        </div>
        <div className="px-6 py-8 md:px-8 md:py-12 text-center rounded-b-xl bg-gray-100">
          <div className="h-10 w-48 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer rounded-lg mx-auto mb-4"></div>
          {userInfo && userInfo.picture && (
            <div className="flex justify-center items-center">
              <div className="flex items-center justify-center mt-4 p-4 bg-white rounded-full shadow-md cursor-pointer border-solid border-2">
                <div className="h-10 w-10 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer rounded-full"></div>
                <div className="h-6 w-48 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer rounded-lg ml-2"></div>
              </div>
            </div>
          )}
        </div>
        <PostSkeleton count={2} />
      </div>
    );
  }

  if (!destination)
    return <div className="p-4 text-center">Không tìm thấy địa điểm.</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="relative">
        <motion.img
          src={destination.image}
          alt={destination.name}
          className="w-full h-[640px] object-cover rounded-b-3xl shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent rounded-b-3xl"></div>

        <motion.div
          className="absolute bottom-8 left-8 text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-5xl font-bold drop-shadow-lg font-roboto">
            {destination.name}
          </h1>
          <p className="text-lg text-gray-300 mt-2 max-w-2xl drop-shadow-md font-roboto">
            {destination.description}
          </p>
        </motion.div>
      </div>

      <div className="px-6 py-8 md:px-8 md:py-12 text-center rounded-b-xl bg-gray-100">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { duration: 1 } }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl text-black font-medium font-roboto"
        >
          {t("news feed")}
        </motion.h1>
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

      {loading ? (
        <PostSkeleton count={2} />
      ) : Array.isArray(posts) && posts.length > 0 ? (
        <div className="container mx-auto p-5 flex flex-col items-center">
          <AnimatePresence mode="popLayout">
            {posts.map(
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
                    <PostCard
                      post={post}
                      onPostDelete={(postId) => {
                        setPosts((currentPosts) =>
                          currentPosts.filter((post) => post.id !== postId)
                        );
                      }}
                    />
                  </motion.div>
                )
            )}
          </AnimatePresence>
          <div
            ref={observerTarget}
            className="w-full py-4 flex flex-col items-center justify-center"
            style={{ minHeight: "100px", margin: "20px 0" }}
          >
            {loadingMore ? (
              <PostSkeleton count={1} />
            ) : hasMore ? (
              <p className="text-gray-500">{t("Scroll for more posts")}</p>
            ) : (
              posts.length > 0 && (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-gray-500">{t("No more posts")}</p>
                  <Button
                    type="primary"
                    ghost
                    loading={isReloading}
                    onClick={async () => {
                      setIsReloading(true);
                      setCurrentPage(1);
                      setHasMore(true);
                      await loadPosts();
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
                </div>
              )
            )}
          </div>
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
          >
            <Select disabled defaultValue={destination?.id}>
              <Select.Option value={destination?.id}>
                {destination?.name}
              </Select.Option>
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
              className="rounded-lg"
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

export default DestinationDetail;
