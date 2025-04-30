import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchMockPosts } from "../../Data/PostData";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
// Define the Post type
type Post = {
  id: number;
  avatar: string;
  author: string;
  timestamp: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  category: string;
};

const PostFood = () => {
  const { t } = useTranslation();
  const [foodPosts, setFoodPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getFoodPosts = async () => {
      const posts = await fetchMockPosts();
      const filteredPosts = posts.filter((post) => post.category === "food");
      setFoodPosts(filteredPosts);
    };

    getFoodPosts();
  }, []);

  return (
    <>
      <div className="px-6 py-8 md:px-8 md:py-12 text-center rounded-b-xl">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { duration: 1 } }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl text-black font-medium font-roboto"
        >
          {t("food destination")}
        </motion.h1>
      </div>
      <div className="p-6">
        {foodPosts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            {t("No posts available")}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto">
            {foodPosts.map((post) => (
              <motion.div
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                whileHover={{ scale: 1.03 }}
                onClick={() => navigate(`/post/${post.id}`)} // Điều hướng đến PostDetail
              >
                {/* Header */}
                <div className="flex items-center p-4 border-b border-gray-200">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {post.author}
                    </h3>
                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {post.content}
                  </p>

                  {/* Images */}
                  {post.images.length > 0 && (
                    <motion.div
                      className="h-48 w-full overflow-hidden rounded-md mb-4"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={post.images[0]}
                        alt="Post"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}

                  {/* Footer */}
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <p>
                      <span className="font-medium text-gray-700">
                        {post.likes}
                      </span>{" "}
                      lượt thích
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">
                        {post.comments}
                      </span>{" "}
                      bình luận
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PostFood;
