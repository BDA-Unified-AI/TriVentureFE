import React from "react";
import { useLocation, Link } from "react-router-dom";

type Post = {
  id: number;
  avatar: string;
  author: string;
  timestamp: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
};

const PostSearch: React.FC = () => {
  // Lấy state được truyền từ navigate
  const location = useLocation();
  const { results, query } = location.state as {
    results: Post[];
    query: string;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Kết quả tìm kiếm cho: "{query}"
        </h1>
        {results && results.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {results.map((post) => (
              <li key={post.id} className="py-4 flex items-start space-x-4">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <Link
                    to={`/post/${post.id}`}
                    className="text-lg font-semibold text-blue-600 hover:text-blue-800"
                  >
                    {post.content}
                  </Link>
                  <p className="text-sm text-gray-500">
                    Đăng bởi {post.author} - {post.timestamp}
                  </p>
                  <div className="flex space-x-4 mt-2">
                    <span className="text-gray-600 text-sm">
                      <strong>{post.likes}</strong> lượt thích
                    </span>
                    <span className="text-gray-600 text-sm">
                      <strong>{post.comments}</strong> bình luận
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-lg">
            Không tìm thấy bài viết nào phù hợp với từ khóa "{query}".
          </p>
        )}

        <div className="mt-6">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostSearch;
