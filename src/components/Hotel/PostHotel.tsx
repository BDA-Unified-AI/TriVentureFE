// src/pages/PostHotel.tsx
import { Card, Button } from "antd";
import { motion } from "framer-motion";
import { fetchMockPosts } from "../../Data/PostData";
import { LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useTranslation } from "react-i18next";
const { Meta } = Card;

interface Post {
  id: number;
  avatar: string;
  author: string;
  timestamp: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  category: string;
}

const PostCard = ({ post }: { post: Post }) => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Initialize navigate
  const handleBooking = () => {
    navigate(`/post/${post.id}`); // Navigate to post details page
  };

  return (
    <Card
      hoverable
      cover={
        <div className="h-36 md:h-52 lg:h-64">
          <img
            alt={post.content}
            src={post.images[0]}
            className="object-cover h-full w-full rounded-md"
          />
        </div>
      }
      className="col-span-1 p-2 hover:scale-110 transition transform duration-150 ease-in-out"
    >
      <Meta
        avatar={
          <img
            src={post.avatar}
            alt="author-avatar"
            className="rounded-full w-10 h-10"
          />
        }
        title={post.author}
        description={post.timestamp}
      />
      <div className="mt-4">
        <p>{post.content}</p>
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-sm text-gray-600">
              <LikeOutlined /> {post.likes} {t("Like")}
            </p>
            <p className="text-sm text-gray-600">
              <MessageOutlined /> {post.comments} {t("Comment")}
            </p>
          </div>
          <Button type="primary" className="mt-2" onClick={handleBooking}>
            {t("book now")}
          </Button>
        </div>
      </div>
    </Card>
  );
};

const PostHotel = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const getHotelPosts = async () => {
      const posts = await fetchMockPosts();
      const filteredPosts = posts.filter((post) => post.category === "hotel");
      setPosts(filteredPosts);
    };

    getHotelPosts();
  }, []);

  return (
    <>
      <div className="px-6 py-8 md:px-8 md:py-12 text-center rounded-b-xl">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { duration: 1 } }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent font-bold font-roboto"
        >
          {t("hotel")}
        </motion.h1>
      </div>
      <div className="container mx-auto p-4">
        <div className="block md:grid md:grid-cols-3 lg:grid-cols-4 gap-2">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostHotel;
